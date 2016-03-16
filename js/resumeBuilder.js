/*global structure*/

var bio = {
  "name": "Philip J. Fry",
  "role": "Delivery Boy",
  "contacts": {
    "mobile": "",
    "email": "my@email.com",
    "github": "https://github.com/bugyt",
    "location": "New New York"
  },
  "skills": ["awesomeness", "delivering things", "cryogenic sleep", "saving the universe"],
  "bioPic": "images/fry.jpg",
  "welcomeMsg": "Welcome on my Resume !"
};

var education = {
  "schools": [{
      "name": "Eckerd College",
      "city": "Saint Petersburg, FL, US",
      "degree": "BA",
      "major": ["CompSci", "French"]
    }, {
      "name": "Nova Southeastern University",
      "city": "Fort Lauderdale, FL, US",
      "degree": "Masters",
      "major": ["CompSci", "French"]
    }

  ],
  "online courses": [{
    "title": "Javascript Syntax",
    "school": "Udacity",
    "date": 2016,
    "url": "https://classroom.udacity.com/courses/ud804/lessons/1930528550/concepts/19506785590923"
  }]

};

var works = {
  "jobs": [{
      "employer": "Planet Express",
      "title": "Delivery Boy",
      "dates": "January 3000 - Future",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus elementum est non lectus venenatis finibus. Ut velit arcu, blandit a elit nec, egestas elementum lorem. Duis maximus massa enim, tempus vestibulum felis ultricies ac. Cras auctor augue eget libero finibus, eu cursus turpis aliquet. Ut tincidunt venenatis lacus et vehicula.",
    }, {
      "employer": "Earth Fast",
      "title": "Delivery Boy",
      "dates": "January 3000 - Future",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus elementum est non lectus venenatis finibus. Ut velit arcu, blandit a elit nec, egestas elementum lorem. Duis maximus massa enim, tempus vestibulum felis ultricies ac. Cras auctor augue eget libero finibus, eu cursus turpis aliquet. Ut tincidunt venenatis lacus et vehicula.",
    }

  ]

};

var projects = {
  "projects": [{
    "title": "",
    "dates": "",
    "description": "",
    "images": ""
  }]
};

function testReplaceAppend(arr, node, pre) {

  var output = "";
  if (arr[0] instanceof Array) {
    if (arr[1] === "") {
      console.log("oui");
      output = arr[0].map(function(val) {
        return structure[arr[2]].replace(/%data%/, val);
      });
      console.log(output);
    } else {
      arr.map(function(val) {
        if (val[0].hasOwnProperty(val[1])) {
          output += structure[val[2]].replace(/%data%/, val[0][val[1]]);
        }
      });
    }
  } else {

    if (arr[0].hasOwnProperty(arr[1])) {

      output += structure[arr[2]].replace(/%data%/, arr[0][arr[1]]);
    }


  }

  if (output instanceof Array && output.length > 0) {
    output.map(function(val) {
      (!pre) ? $(node + ":last").append(val) : $(node + ":last").prepend(val);
    });
  } else {
    if (output !== "") {
      (!pre) ? $(node + ":last").append(output) : $(node + ":last").prepend(output);
    }
  }

}

function locationizer(workObj) {
  var newArr = [];
  workObj.jobs.map(function(val) {
    // if (newArr.indexOf(val.location)<1) {
    newArr.push(val.location);
    //  }
  });

  return newArr;

}

function inName(fullName, lang) {
  
  var arr = fullName.split(" ");

  if (lang === "FR") {
    arr.unshift(arr.pop().toUpperCase());
    return arr.join(" ");
  }
  return bio.name;
}


testReplaceAppend([bio, "role", "HTMLheaderRole"], "#header", true);
testReplaceAppend([bio, "name", "HTMLheaderName"], "#header", true);
$("#header").append(structure.internationalizeButton);

testReplaceAppend([bio.contacts, "email", "HTMLemail"], "#topContacts");
testReplaceAppend([bio.contacts, "github", "HTMLgithub"], "#topContacts");
testReplaceAppend([bio.contacts, "location", "HTMLlocation"], "#topContacts");

testReplaceAppend([bio, "bioPic", "HTMLbioPic"], "#header");
testReplaceAppend([bio, "welcomeMsg", "HTMLwelcomeMsg"], "#header");


if (bio.skills.length > 0) {
  $("#header").append(structure.HTMLskillsStart);
  testReplaceAppend([bio.skills, "", "HTMLskills"], "#skills");
}

for (var job in works.jobs) {
  $("#workExperience").append(structure.HTMLworkStart);
  testReplaceAppend([
    [works.jobs[job], "employer", "HTMLworkEmployer"],
    [works.jobs[job], "title", "HTMLworkTitle"]
  ], ".work-entry");
  testReplaceAppend([works.jobs[job], "dates", "HTMLworkDates"], ".work-entry");
  testReplaceAppend([works.jobs[job], "description", "HTMLworkDescription"], ".work-entry");
}

function logClicks(x, y) {
  console.log("pageX: " + x + ", pageY: " + y);
}

$(document).click(function(loc) {
  logClicks(loc.pageX, loc.pageY);
});




// HTMLworkStart: '<div class="work-entry"></div>',
// HTMLworkEmployer: '<a href="#">%data%',
// HTMLworkTitle: ' - %data%</a>',
// HTMLworkDates: '<div class="date-text">%data%</div>',
// HTMLworkLocation: '<div class="location-text">%data%</div>',
// HTMLworkDescription: '<p><br>%data%</p>',