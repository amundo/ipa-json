var 
  fs = require('fs'),
  fetch = require('node-fetch'),
  striptags = require('striptags'),
  jsdom = require('jsdom'),
  table2json = require('./table2json');

var clean = data => { 
  data.forEach( d => {
    delete d.Graphic;
    d.Character = d['\n                      Character \n                      \n                        If these characters are not displaying correctly, click for information.\n                        \n                    '];    
    delete d['\n                      Character \n                      \n                        If these characters are not displaying correctly, click for information.\n                        \n                    '];
    d['Unicode Name'] = striptags(d['Unicode Name']); 
    d.Character = striptags(d.Character);
    d['USV'] = striptags(d['USV']); 
  })

  return data;
}

var save = data => {
  fs.writeFile("./ipaBook.json", JSON.stringify(data,null,2), function(err) {
      if(err) {
          return console.log(err);
      }
  
      console.log("Data saved to ipaBook.json");
  }); 

}

var parse = data => {
  jsdom.env(data, function(err, window){ 
    var table = window.document.querySelector('table.Table_Default');
    var data = table2json.parse(table); 
    save(clean(data)); 
  })
}

var xparse = function(data){ console.log(data) }

fetch('http://scriptsource.org/cms/scripts/page.php?item_id=entry_detail&uid=wlbaybzb9e#bce6a902')
  .then(response => response.text())
  .then(parse)

