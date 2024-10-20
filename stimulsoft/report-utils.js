const fs = require('fs-extra');

var reportUtils = {
  async translateReport(report, userCulture) {
    const translationJson = await fs.readJson(`./stimulsoft/localizations/${userCulture}.json`);
    let componentsList = [];
    report.renderedPages.list.forEach((page) => {
      var components = page.getComponents().list;
      componentsList.push(...components.filter((component) => component.text && component.text.includes('_trans')));
    });

    componentsList.forEach((component) => {
      const allStringList = component.text.match(/_trans\w+/g);
      const uniqueStringList = [...new Set(allStringList)];
      //console.log(uniqueStringList);
      uniqueStringList.forEach((x) => {
        const regex = new RegExp(x, 'g');
        const translation = translationJson[x];
        if (translation) {
          component.text = component.text.replace(regex, translation);
        }
      });
    });
  },
};

module.exports = reportUtils;
