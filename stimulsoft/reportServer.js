var http = require('http');
var PostgreSQLAdapter = require('./PostgreSQLAdapter');
var response;

var reportingServer = {
  initServer: (port) => {
    function accept(req, res) {
      console.log(req, res);
      response = res;
      response.setHeader('Access-Control-Allow-Origin', '*');
      response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      response.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
      response.setHeader('Cache-Control', 'no-cache');

      var data = '';
      req.on('data', function (buffer) {
        data += buffer;
      });

      console.log(data);

      req.on('end', function () {
        if (data.indexOf('{') != 0) {
          data = Buffer.from(
            data.replace(/[A-Za-z]/g, function (c) {
              return String.fromCharCode(c.charCodeAt(0) + (c.toUpperCase() <= 'M' ? 13 : -13));
            }),
            'base64'
          ).toString('ascii');
        }

        console.log(data);

        const command = JSON.parse(data.toString());

        command.queryString = applyQueryParameters(
          command.queryString,
          command.parameters,
          command.escapeQueryParameters
        );

        if (command.database == 'PostgreSQL') PostgreSQLAdapter.process(command, onProcess);
        else
          onResult({
            success: false,
            notice: "Database '" + command.database + "' not supported!",
          });
      });
    }

    var applyQueryParameters = function (baseSqlCommand, parameters, escapeQueryParameters) {
      if (baseSqlCommand == null || baseSqlCommand.indexOf('@') < 0) return baseSqlCommand;

      var result = '';
      while (baseSqlCommand.indexOf('@') >= 0 && parameters != null && parameters.length > 0) {
        result += baseSqlCommand.substring(0, baseSqlCommand.indexOf('@'));
        baseSqlCommand = baseSqlCommand.substring(baseSqlCommand.indexOf('@') + 1);

        var parameterName = '';

        while (baseSqlCommand.length > 0) {
          var char = baseSqlCommand.charAt(0);
          if (char.length === 1 && char.match(/[a-zA-Z0-9_-]/i)) {
            parameterName += char;
            baseSqlCommand = baseSqlCommand.substring(1);
          } else break;
        }

        var parameter = parameters.find((parameter) => parameter.name.toLowerCase() == parameterName.toLowerCase());
        if (parameter) {
          if (parameter.typeGroup != 'number') {
            if (escapeQueryParameters)
              result +=
                "'" +
                parameter.value.toString().replace(/\\/gi, '\\\\').replace(/\'/gi, "\\'").replace(/\"/gi, '\\"') +
                "'";
            else result += "'" + parameter.value.toString() + "'";
          } else result += parameter.value.toString();
        } else result += '@' + parameterName;
      }

      return result + baseSqlCommand;
    };

    var onProcess = function (result) {
      result.handlerVersion = '2022.1.2';
      console.log(result);
      response.end(JSON.stringify(result));
    };

    http.createServer(accept).listen(port);
    console.log(`[Report server] The DataAdapter run on port ${port}`);
    console.log(
      '[Report server] To use, on the client side, you need to specify the URL of this host that handles requests:'
    );
    console.log(`[Report server] StiOptions.WebServer.url = "http://localhost:${port}"`);
  },
};

module.exports = reportingServer;
