var $imgs = $('#gallery img');
var $cache = [];
var $search = $('#filter-search');
for(var i = 0; i < $imgs.length; i++)
{
  $cache[i] = $imgs[i];
}

(function() {
  
  var $buttons = $('#buttons');
  var tagged = {};

  $imgs.each(function() {
    var img = this;
    var tags = $(this).data('tags');

    if (tags) {
      tags.split(',').forEach(function(tagName) {
        if (tagged[tagName] == null) {
          tagged[tagName] = [];
        }
        tagged[tagName].push(img);
      })
    }
  })

  $('<button/>', {
    text: 'Show All',
    class: 'active',
    click: function() {
      $(this)
        for (i = 0; i < $imgs.length; i++) { 
          $imgs[i].parentElement.style.display = 'inline';
          $cache[i] = $imgs[i];
        }
    }
  }).appendTo($buttons);

  $.each(tagged, function(tagName) {
    var $n = $(tagged[tagName]).length;
    $('<button/>', {
      text: tagName + '(' + $n + ')',
      click: function() {
        $cache = [];
        $(this)
          .addClass('active')
          .siblings()
          .removeClass('active');
        for (i = 0; i < $imgs.length; i++) { 
          $imgs[i].parentElement.style.display = 'none';
        }
        var temp = $imgs.filter(tagged[tagName])
        for (i = 0; i < temp.length; i++) {          
          $cache[i] = temp[i];
        }
        var query = document.getElementById("filter-search").value.trim().toLowerCase();
        $cache.forEach(function(img) {
          var index = 0;
          if (query) {
            index = img.alt.toLowerCase().indexOf(query);
          }
          img.parentElement.style.display = index === -1 ? 'none' : 'inline';
        })
      }
    }).appendTo($buttons);
  });
}())

function filter() {
  var query = this.value.trim().toLowerCase();
  $cache.forEach(function(img) {
    var index = 0;
    if (query) {
      index = img.alt.toLowerCase().indexOf(query);
    }
    img.parentElement.style.display = index === -1 ? 'none' : 'inline';
  })
}

(function() {
  
  var tokenlist = {
  	"liontamer": [1, "Lion Tamer", "Lion"],
    "tinkertowntoymaker":[1, "Tinkertown Toymaker", "Battlebot Charge", "Battlebot Taunt", "Battlebot Windfury", "Discover Charge", "Discover Taunt", "Discover Windfury"],
    "toppermcnabb":[1, "Topper McNabb", "Coin Purse"],
    "feralform":[1, "Feral Form", "Feral Form Token"],
    "thanekorthazz":[1, "thanekorthazz", "Skeleton"],
    "weaverofshadows":[1, "Weaver of Shadows", "Shade"],
    "defiasrecruit":[1, "Defias Recruit", "Weapon"],
    "magicianshat":[1, "magicianshat", "Rabbit"],
    "tectus":[1, "Tectus", "Shard of Tectus 1", "Shard of Tectus 2"],
    "queenazshara":[1, "Queen Azshara", "Tormenting Whispers"]

  };

  var classname = document.getElementsByClassName("token");

  var scrollTokens = function() {
    var tokenset = tokenlist[this.id];
    cToken = tokenset[0];
    cToken++;
    if(cToken >= tokenset.length) 
    {
      cToken = 1;
    }
    tokenset[0] = cToken;
    this.src = "cards/"+tokenset[tokenset[0]]+".png";
  };

  for (var i = 0; i < classname.length; i++) {
    classname[i].addEventListener('click', scrollTokens, false);
  }

  
  if ('oninput' in $search[0]) {
    $search.on('input', filter);
  } else {
    $search.on('keyup', filter);
  }
}())