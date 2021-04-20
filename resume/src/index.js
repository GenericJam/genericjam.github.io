import React from "react";

import ReactDOM from "react-dom";
import "./index.css";
import shuffle from "shuffle-array";

const themes = [
  {
    image: `${process.env.PUBLIC_URL}/images/1.png`,
    colors: { darkbg1: "#BC9195", darkbg2: "#91BC9B" }
  },
  {
    image: `${process.env.PUBLIC_URL}/images/2.png`,
    colors: { darkbg1: "#ffffff", darkbg2: "#ffffff" }
  },
  {
    image: `${process.env.PUBLIC_URL}/images/3.png`,
    colors: { darkbg1: "#FF4848", darkbg2: "#48ff7c" }
  },
  {
    image: `${process.env.PUBLIC_URL}/images/5.png`,
    colors: { darkbg1: "#c0ced7", darkbg2: "#83b9c3" }
  },
  {
    image: `${process.env.PUBLIC_URL}/images/6.png`,
    colors: { darkbg1: "#c0a645", darkbg2: "#70a354" }
  },
  {
    image: `${process.env.PUBLIC_URL}/images/7.png`,
    colors: { darkbg1: "#b69696", darkbg2: "#bde8e0" }
  },
  {
    image: `${process.env.PUBLIC_URL}/images/8.png`,
    colors: { darkbg1: "#00c048", darkbg2: "#c000c0" }
  },
  {
    image: `${process.env.PUBLIC_URL}/images/9.png`,
    colors: { darkbg1: "#aa5555", darkbg2: "#aaaaaa" }
  },
  {
    image: `${process.env.PUBLIC_URL}/images/10.png`,
    colors: { darkbg1: "#ff4340", darkbg2: "#ffff60" }
  },
  {
    image: `${process.env.PUBLIC_URL}/images/11.png`,
    colors: { darkbg1: "#0607f6", darkbg2: "#a968ad" }
  },
  {
    image: `${process.env.PUBLIC_URL}/images/12.png`,
    colors: { darkbg1: "#c18ca3", darkbg2: "#29d4c7" }
  },
  {
    image: `${process.env.PUBLIC_URL}/images/13.png`,
    colors: { darkbg1: "#e417eb", darkbg2: "#b528e3" }
  },
  {
    image: `${process.env.PUBLIC_URL}/images/14.png`,
    colors: { darkbg1: "#d7d9ce", darkbg2: "#cb3843" }
  },
  {
    image: `${process.env.PUBLIC_URL}/images/15.png`,
    colors: { darkbg1: "#42cf24", darkbg2: "#14ef11" }
  },
  {
    image: `${process.env.PUBLIC_URL}/images/16.png`,
    colors: { darkbg1: "#aa557d", darkbg2: "#55644d" }
  },
  {
    image: `${process.env.PUBLIC_URL}/images/17.png`,
    colors: { darkbg1: "#444", darkbg2: "#666666" }
  }
];

class NavBar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <a className="navbar-brand" href="#">
          Top
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a className="nav-link" href="#career">
                Career
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#education">
                Education
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#skills">
                Skills
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#references">
                References
              </a>
            </li>
            {/* <li className="nav-item">
              <a className="nav-link" href="#recentwork">
                Recent Work
              </a>
            </li> */}
            <li className="nav-item">
              <a
                className="nav-link"
                href="./assets/KevinEdeyResume.pdf"
                target="_blank"
              >
                Printable PDF
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mainImage: this.props.mainImage
    };
  }
  render() {
    return (
      <div className="header">
        <div
          className="jumbotron"
          style={{ background: this.props.colors.darkbg2 }}
        >
          <div className="row">
            <div className="col-md-8">
              <h1 className="display-3">Kevin Edey</h1>
              <h2>
                <a
                  href="https://www.google.com/maps/place/Edinburgh/@55.9411885,-3.2753778,12z"
                  target="_blank"
                >
                  Amsterdam
                </a>
              </h2>
              <h2>
                <a href="mailto:genericjam@gmail.com" target="_blank">
                  genericjam@gmail.com
                </a>
              </h2>
              <h2>
                <a href="https://github.com/GenericJam" target="_blank">
                  /GenericJam
                </a>
              </h2>
            </div>
            <div className="col-md-4">
              <img src={this.props.mainImage} className="headerImage" />
            </div>
          </div>
          <p style={{ marginTop: 20 }}>
            I want to know the secrets of the universe. I am pursuing truth
            wherever it leads.
          </p>
        </div>
      </div>
    );
  }
}

class PhotoStrip extends React.Component {
  render() {
    const listthemes = this.props.themes.map((theme, ikey) => (
      <img
        src={theme.image}
        alt="Me!"
        title="CLICK ME!"
        className="photoStripImages"
        onClick={() => {
          this.props.swapImage(theme);
        }}
        key={ikey}
      />
    ));
    return <div>{listthemes}</div>;
  }
}

class Career extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: true
    };
  }

  toggleCollapse() {
    this.setState({ collapsed: !this.state.collapsed });
  }

  render() {
    return (
      <div>
        <a
          name="career"
          className="anchor hover"
          onClick={this.toggleCollapse.bind(this)}
        >
          <h1>Career</h1>
        </a>
        <ResumeItem
          colors={this.props.colors}
          headline={"Software Engineer"}
          collapsed={this.state.collapsed}
          link={"https://conversationals.nl/"}
          company={"Conversationals"}
          location={"Utrect, Netherlands"}
          activities={[
            {
              date: "December 2020 - Present",
              description: [
                "Implemented chat service for Avaya chat application",
                "Worked on feature requests, bug fixes, etc.",
                "Wrote tests to support work done",
                "All work done in Elixir"
              ]
            }
          ]}
        />
        <ResumeItem
          colors={this.props.colors}
          headline={"Contract Software Developer"}
          collapsed={this.state.collapsed}
          link={"https://statstrack.ca/"}
          company={"Statstrack"}
          location={"Toronto, Canada"}
          activities={[
            {
              date: "November 2020",
              description: [
                "Rewrote report generation to be more performant and stable",
                "Worked on feature requests, bug fixes, etc."
              ]
            }
          ]}
        />
        <ResumeItem
          colors={this.props.colors}
          headline={"Software Engineer"}
          collapsed={this.state.collapsed}
          link={"https://gamgee.com/"}
          company={"Gamgee BV"}
          location={"Amsterdam, Netherlands"}
          activities={[
            {
              date: "April 2019 - November 2020",
              description: [
                "Replaced existing backend based on Ruby/RabbitMQ/EventMachine with another written in Elixir",
                "Worked on ‘Gamgee’ app using React Native"
              ]
            }
          ]}
        />
        <ResumeItem
          colors={this.props.colors}
          headline={"Web / Mobile Developer"}
          collapsed={this.state.collapsed}
          link={"https://appsquire.com/"}
          company={"Appsquire Consulting"}
          location={"Edmonton, Canada"}
          activities={[
            {
              date: "November 2017 - June 2018",
              description: [
                "Working on React Native and iOS/Swift with LAMP backend."
              ]
            }
          ]}
        />
        <ResumeItem
          colors={this.props.colors}
          headline={"Web / Mobile Developer (Contractor)"}
          collapsed={this.state.collapsed}
          link={"https://www.kwiksol.com/"}
          company={"Kwiksol Corporation"}
          location={"Edmonton, Canada"}
          activities={[
            {
              date: "April 2017 - Present",
              description: [
                "Built cross platform app (Android, iOS) using React Native and Nodejs that utilizes existing database and syncs with existing live site"
              ]
            },
            {
              date: "August - October 2015",
              description: [
                "Ported existing SaaS website to mobile site using PHP, jQuery, AJAX and Bootstrap"
              ]
            }
          ]}
        />
        <ResumeItem
          colors={this.props.colors}
          headline={"Web Developer (Volunteer)"}
          collapsed={this.state.collapsed}
          link={"https://ethnos.ca/"}
          company={"New Tribes Missions (now Ethnos)"}
          location={"Remote Work"}
          activities={[
            {
              date: "October 2016 - March 2017",
              description: [
                "Assisted in building document management system using Aurelia and JavaScript"
              ]
            }
          ]}
        />
        <ResumeItem
          colors={this.props.colors}
          headline={"C# Web Developer (Contractor)"}
          collapsed={this.state.collapsed}
          link={"https://www.realfoods.co.uk/"}
          company={"Real Foods Ltd."}
          location={"Edinburgh, Scotland"}
          activities={[
            {
              date: "December 2013-July 2014",
              description: [
                `Developed email content management system using ASP.NET for automated customer service and online orders 
                    through the company\'s e-commerce website`,
                `Developed image optimization task in C# and GraphicsMagick to scale and crop images for company website content to 
                    reduce server load`,
                `Developed web scraping scripts in Python with Beautiful Soup to scrape competitors’ websites for price and product data`,
                `Developed mobile app in Java using Codename One to scan barcodes for product price comparison`,
                `Advocated adoption of ASP.MVC to facilitate unit testing and proper separation of presentation from business logic`
              ]
            }
          ]}
        />
        <ResumeItem
          colors={this.props.colors}
          headline={"Web Programmer"}
          collapsed={this.state.collapsed}
          link={"https://www.dkit.ie/"}
          company={"Dundalk Institute of Technology"}
          location={"Dundalk, Ireland"}
          activities={[
            {
              date: "May 2012–August 2012",
              description: [
                `Designed and developed database backed website for the purpose of recording and reporting on class attendance written 
                    in Java using MySql database`,
                `Tested with Junit, automated with Ant`
              ]
            }
          ]}
        />
        <ResumeItem
          colors={this.props.colors}
          headline={"Website and Graphic Designer"}
          collapsed={this.state.collapsed}
          company={"Cara Web Design"}
          location={"Athboy, Ireland"}
          activities={[
            {
              date: "January 2010–December 2013",
              description: [
                `Developed websites using Drupal, Wordpress and/or HTML/CSS/JavaScript for small businesses and organizations`,
                `Designed graphics for the websites, brochures, business cards and signage`
              ]
            }
          ]}
        />
        <ResumeItem
          colors={this.props.colors}
          headline={"Software Researcher and Designer"}
          collapsed={this.state.collapsed}
          company={"Interact Forms Ltd."}
          location={"Athboy, Ireland"}
          activities={[
            {
              date: "July 2008 - January 2011",
              description: [
                `Designed software specification and cost benefit analysis for a new business web application with an 
                  Enterprise Ireland Innovation Voucher in partnership with Dundalk Institute of Technology`
              ]
            }
          ]}
        />
        <ResumeItem
          colors={this.props.colors}
          headline={"Technical Site Supervisor"}
          collapsed={this.state.collapsed}
          company={"A-Frame"}
          location={"Rathcairn, Ireland"}
          activities={[
            {
              date: "October 2006 - November 2007",
              description: [
                `Supervised the production and installation of prefabricated wood framed house systems`
              ]
            }
          ]}
        />
        <ResumeItem
          colors={this.props.colors}
          headline={"Company Owner and Builder"}
          collapsed={this.state.collapsed}
          company={"Custom Home Builder"}
          location={"Alberta / British Columbia, Canada"}
          activities={[
            {
              date: "2002-2006",
              description: [
                `Owned construction companies, ran crews, built custom houses`
              ]
            }
          ]}
        />
        <ResumeItem
          colors={this.props.colors}
          headline={"Oil Rig Crew"}
          collapsed={this.state.collapsed}
          company={"Precision Drilling"}
          location={"Alberta / British Columbia, Canada"}
          activities={[
            {
              date: "1999-2001",
              description: [
                `Worked on oil well drilling rigs as Floor Hand (Roughneck) and Motor Hand (Motors)`
              ]
            }
          ]}
        />
      </div>
    );
  }
}

class Skills extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: true
    };
  }

  toggleCollapse() {
    this.setState({ collapsed: !this.state.collapsed });
  }

  render() {
    return (
      <div>
        <a
          name="skills"
          className="anchor hover"
          onClick={this.toggleCollapse.bind(this)}
        >
          <h1>Skills</h1>
        </a>
        <ResumeItem
          colors={this.props.colors}
          headline={"Programming Languages"}
          collapsed={this.state.collapsed}
          company={"Java, C#, C, C++, Python, Swift, Erlang, VBA, PHP"}
          location={""}
          activities={[
            {
              date: "",
              description: [
                "The images in this document were produced using a photo of me processed using Python (PIL)"
              ]
            }
          ]}
        />
        <ResumeItem
          colors={this.props.colors}
          headline={"Web Languages"}
          collapsed={this.state.collapsed}
          company={"HTML, CSS, XML, JSON, JavaScript, jQuery"}
          location={""}
          activities={[
            {
              date: "",
              description: ["This page is written in JavaScript using React"]
            }
          ]}
        />
        <ResumeItem
          colors={this.props.colors}
          headline={"Operating Systems"}
          collapsed={this.state.collapsed}
          company={"Windows (10, 7, XP), Linux (Mint, Ubuntu, Scientific), OSX"}
          location={""}
          activities={[
            {
              date: "",
              description: [
                "I currently use Linux Mint as my main operating system with virtual machines of Windows 10 and Mac OS"
              ]
            }
          ]}
        />
        <ResumeItem
          colors={this.props.colors}
          headline={"Artificial Intelligence"}
          collapsed={this.state.collapsed}
          company={
            "Advanced Natural Language Processing, Advanced Vision, Reinforcement Learning"
          }
          location={""}
          activities={[
            {
              date: "",
              description: [
                "I have completed approximately half of an MSc in Artificial Intelligence between the University of Edinburgh and the University of Alberta"
              ]
            }
          ]}
        />
        <ResumeItem
          colors={this.props.colors}
          headline={"Development Tools"}
          collapsed={this.state.collapsed}
          company={
            "Xcode, Visual Studio, Notepad++, Geany (Linux), Sublime, Atom, VS Code, Eclipse, NetBeans"
          }
          location={""}
          activities={[
            {
              date: "",
              description: [
                "I currently use Visual Studio Code as my main editor and use the command line for everything else"
              ]
            }
          ]}
        />
        <ResumeItem
          colors={this.props.colors}
          headline={"Design Tools"}
          collapsed={this.state.collapsed}
          company={
            "Photoshop, MS Visio, Balsamiq, Google Drive (Drawing), 3DS Max, GIMP, Blender"
          }
          location={""}
          activities={[
            {
              date: "",
              description: [
                "I can also design programmatically as evidenced by this page"
              ]
            }
          ]}
        />
        <ResumeItem
          colors={this.props.colors}
          headline={"Office Tools"}
          collapsed={this.state.collapsed}
          company={"Word, Excel, PowerPoint, LaTex, Libre Office, Google Docs"}
          location={""}
          activities={[
            {
              date: "",
              description: [""]
            }
          ]}
        />
        <ResumeItem
          colors={this.props.colors}
          headline={"Project Management"}
          collapsed={this.state.collapsed}
          company={"Google Drive, Google Calendar, Trello"}
          location={""}
          activities={[
            {
              date: "",
              description: [""]
            }
          ]}
        />

        <ResumeItem
          colors={this.props.colors}
          headline={"Systems Design"}
          collapsed={this.state.collapsed}
          company={
            "System Specifications and Design, Distributed Systems, Test Driven Development, White Box Testing, Black Box Testing"
          }
          location={""}
          activities={[
            {
              date: "",
              description: [""]
            }
          ]}
        />
        <ResumeItem
          colors={this.props.colors}
          headline={"Testing, Automation and Debugging"}
          collapsed={this.state.collapsed}
          company={"JUnit, Spring, Ant, Gulp, Benchmarking"}
          location={""}
          activities={[
            {
              date: "",
              description: [""]
            }
          ]}
        />
        <ResumeItem
          colors={this.props.colors}
          headline={"GUI"}
          collapsed={this.state.collapsed}
          company={"Java Swing, C++ SDL, Web Interfaces"}
          location={""}
          activities={[
            {
              date: "",
              description: [""]
            }
          ]}
        />
        <ResumeItem
          colors={this.props.colors}
          headline={"Servers"}
          collapsed={this.state.collapsed}
          company={"Apache HTTP, Apache Tomcat, Yaws, IIS, Nodejs"}
          location={""}
          activities={[
            {
              date: "",
              description: [
                "I usually write my own so lately I am using Nodejs(Hapi)"
              ]
            }
          ]}
        />
        <ResumeItem
          colors={this.props.colors}
          headline={"Version Control"}
          collapsed={this.state.collapsed}
          company={"Subversion (SVN), Git"}
          location={""}
          activities={[
            {
              date: "",
              description: [""]
            }
          ]}
        />
        <ResumeItem
          colors={this.props.colors}
          headline={"Mobile"}
          collapsed={this.state.collapsed}
          company={
            "iOS, Android, React Native, Codename One, Deployment: iOS: Ad hoc, App Store; Android:  Ad hoc, Play Store"
          }
          location={""}
          activities={[
            {
              date: "",
              description: [
                "My latest project was using React Native on the front end, Nodejs on the back and MySQL as the database"
              ]
            }
          ]}
        />
        <ResumeItem
          colors={this.props.colors}
          headline={"Frameworks"}
          collapsed={this.state.collapsed}
          company={
            "Google Web Toolkit, Spring, ASP, .NET, Bootstrap, Angular, React, Beautiful Soup"
          }
          location={""}
          activities={[
            {
              date: "",
              description: [
                "Of all of the frameworks I have used Spring is the most robust and Beautiful Soup is the most fun"
              ]
            }
          ]}
        />
        <ResumeItem
          colors={this.props.colors}
          headline={"Etc"}
          collapsed={this.state.collapsed}
          company={"React Native, Web crawlers, Web scrapers, Load testing"}
          location={""}
          activities={[
            {
              date: "",
              description: [
                "For my latest project I built a load testing server to simulate thousands of users simultaneously using the app to make sure the server would stand up to it"
              ]
            }
          ]}
        />
      </div>
    );
  }
}

class Education extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: true
    };
  }

  toggleCollapse() {
    this.setState({ collapsed: !this.state.collapsed });
  }

  render() {
    return (
      <div>
        <a
          name="education"
          className="anchor hover"
          onClick={this.toggleCollapse.bind(this)}
        >
          <h1>Education</h1>
        </a>
        <ResumeItem
          colors={this.props.colors}
          headline={"Post Grad Certificate in Evolution of Language and Cognition"}
          collapsed={this.state.collapsed}
          link={
            "https://www.ed.ac.uk/ppls/linguistics-and-english-language/prospective/postgraduate/msc/evolution-of-language-cognition"
          }
          company={"University of Edinburgh"}
          location={"Edinburgh, Scotland"}
          activities={[
            {
              date: "September 2018-December 2018",
              description: [
                "Courses: Intro to Syntax, Intro to Phonology and Phonetics, Univariate Statistics with R, Universals of Language, Intro to Mind, Language and Embodied Cognition (audited), Origins and Evolution of Language, Foundations of Evolution"
              ]
            }
          ]}
        />
        <ResumeItem
          colors={this.props.colors}
          headline={"MSc in Artificial Intelligence (Incomplete)"}
          collapsed={this.state.collapsed}
          link={
            "https://www.ed.ac.uk/studying/postgraduate/degrees/index.php?r=site/view&id=107"
          }
          company={"University of Edinburgh"}
          location={"Edinburgh, Scotland"}
          activities={[
            {
              date: "September 2013-August 2014",
              description: [
                "Courses: Natural Language Processing, Computer Vision, Informatics Research Review"
              ]
            }
          ]}
        />
        <ResumeItem
          colors={this.props.colors}
          headline={"BSc in Computing (2.1)"}
          collapsed={this.state.collapsed}
          link={"https://www.dkit.ie/"}
          company={"Dundalk Institute of Technology"}
          location={"Dundalk, Ireland"}
          activities={[
            {
              date: "September 2009-April 2013",
              description: [
                "Thesis: Benchmarking Servers: Java, Erlang, Tomcat and Yaws"
              ]
            }
          ]}
        />
        <ResumeItem
          colors={this.props.colors}
          headline={"Object Oriented System Analysis and Design Certificate"}
          collapsed={this.state.collapsed}
          link={"http://www.sait.ca/"}
          company={"Southern Alberta Institute of Technology"}
          location={"Calgary, Alberta"}
          activities={[
            {
              date: "September 1998-April 1999",
              description: ["One year of night classes"]
            }
          ]}
        />
        <ResumeItem
          colors={this.props.colors}
          headline={"2D and 3D CAD Certificates"}
          collapsed={this.state.collapsed}
          link={"http://www.cityandguilds.com/"}
          company={"City and Guilds"}
          location={"Dundalk, Ireland"}
          activities={[
            {
              date: "November 2007-May 2008",
              description: [
                "Six months full time training in AutoCAD, Revitt and Inventor"
              ]
            }
          ]}
        />
      </div>
    );
  }
}

class References extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: true
    };
  }

  toggleCollapse() {
    this.setState({ collapsed: !this.state.collapsed });
  }

  render() {
    return (
      <div>
        <a
          name="references"
          className="anchor hover"
          onClick={this.toggleCollapse.bind(this)}
        >
          <h1>References</h1>
        </a>
        <ResumeItem
          colors={this.props.colors}
          headline={"Dr. Christian Horn"}
          collapsed={this.state.collapsed}
          link={"https://www.dkit.ie/users/christian-horn"}
          company={
            "Head of Computing Department, Dundalk Institute of Technology, Ireland"
          }
          location={"Dundalk, Ireland"}
          activities={[
            {
              date: "",
              description: ["Email: christian.horn@dkit.ie"]
            }
          ]}
        />
        <ResumeItem
          colors={this.props.colors}
          headline={"Dr. Matt Spike"}
          collapsed={this.state.collapsed}
          link={"http://www.lel.ed.ac.uk/cle/index.php/who-works-here/"}
          company={"Lecturer, Centre for Language Evolution"}
          location={"Edinburgh, Scotland"}
          activities={[
            {
              date: "",
              description: ["Email: mspike@exseed.ed.ac.uk"]
            }
          ]}
        />
        <ResumeItem
          colors={this.props.colors}
          headline={"Vincent Wansink"}
          collapsed={this.state.collapsed}
          link={"https://www.kwiksol.com/"}
          company={"President, Kwiksol Corporation"}
          location={"Edmonton, Alberta"}
          activities={[
            {
              date: "",
              description: ["Email: vincentwansink@outlook.com"]
            }
          ]}
        />
      </div>
    );
  }
}

class RecentWork extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: true
    };
  }

  toggleCollapse() {
    this.setState({ collapsed: !this.state.collapsed });
  }

  render() {
    return (
      <div>
        <a
          name="recentwork"
          className="anchor hover"
          onClick={this.toggleCollapse.bind(this)}
        >
          <h1>Recent Work</h1>
        </a>
        <ResumeItem
          colors={this.props.colors}
          headline={"TimeSavr App"}
          collapsed={this.state.collapsed}
          link={"https://play.google.com/store/apps/details?id=net.timesavr"}
          company={"Kwiksol"}
          location={"Edmonton, Alberta"}
          activities={[
            {
              date: "Currently",
              description: [
                `Unfortunately, it is difficult to assess the capabilities of it without a subscription to the service which it is designed for. Contact me and I\'ll give you a demonstration or arrange for access.
                It is written using React Native which builds for Android and iOS relatively easily and is a pretty good choice for cross platform apps.`
              ]
            }
          ]}
        />
        <ResumeItem
          colors={this.props.colors}
          headline={"The Starlite App"}
          collapsed={this.state.collapsed}
          link={
            "https://play.google.com/store/apps/details?id=com.starliteroom.members"
          }
          company={"Appsquire Consulting"}
          location={"Edmonton, Alberta"}
          activities={[
            {
              date: "January 2018",
              description: [
                `This is an app which I rewrote while working for Appsquire Consulting. Unfortunately, it has some poor reviews on Google Play currenlty due to payment issues which were not fully worked out prior to release due to direction by company management. I believe the company has since fixed these bugs.`
              ]
            }
          ]}
        />
        <ResumeItem
          colors={this.props.colors}
          headline={"Edwebdev.net"}
          collapsed={this.state.collapsed}
          link={"http://quiet-garden-59912.herokuapp.com/"}
          company={"Myself"}
          location={"Edmonton, Alberta"}
          activities={[
            {
              date: "2016",
              description: [
                `I built this site for myself to learn Flask (Python) and do something interesting with it. I am using Bootstrap and jQuery for the front end. I think this sort of highlights what I think my forte is: being creative with technical tools. Of note are things like the colors and font loading dynamically so that the website is a bit different every time it loads. Also, I wanted transparent headlines that cut through the background. There was no way to do this at the time so I wrote a script to cut them out of a white image on the server and then serve the text in the correct font but invisible so it could still be searchable by Google, etc. I wanted cards that were unique and I thought living in the frozen north, a snowflake seemed like a good thing to put on business cards, making each one unique. I wrote a script to produce snowflakes which you can access by appending 'snowflake' onto the end of the above url. Each time you hit that you'll get a new snowflake produced just for you. It even takes arguments if you want a snowflake of a different size. Append 'snowflake/200.5' to the above link, any floating point number will do. If you're interested in the snowflake making experience there is an entry on the above site in the blog. If you want your own personal snow storm put 'birthdaycard/a' after the url above.`
              ]
            }
          ]}
        />
      </div>
    );
  }
}

class ResumeItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true
    };
  }

  componentWillMount() {
    this.setState({ collapsed: this.props.collapsed });
  }

  expand = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  componentWillReceiveProps() {
    this.setState({ collapsed: this.props.collapsed });
  }

  render() {
    return (
      <div
        onClick={this.expand}
        className="itemWrapper"
        style={{ background: this.props.colors.darkbg1 }}
      >
        <h3>{this.props.headline}</h3>
        {this.state.collapsed ? (
          <div />
        ) : (
          <ul>
            <li className="noBullets">
              {this.props.link ? (
                <a href={this.props.link} target="_blank">
                  {this.props.company}
                </a>
              ) : (
                this.props.company
              )}
            </li>
            <li className="noBullets">{this.props.location}</li>

            {this.props.activities.map(activity => (
              <li className="noBullets">
                {activity.date}
                <ul>
                  {activity.description.map((item, ikey) => (
                    <li className="noBullets" key={ikey}>
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

class Resume extends React.Component {
  constructor(props) {
    super(props);
    this.themes = themes;
    shuffle(this.themes);
    this.themes.splice(0, 0, {
      image: `${process.env.PUBLIC_URL}/images/4.png`,
      colors: {
        darkbg1: "#e9ecef",
        darkbg2: "#C7CACC"
      }
    });

    // this.driftColor(this.themes[1]);

    this.state = {
      mainImage: this.themes[0].image,
      colors: this.themes[0].colors
      // drifting: true
    };
  }

  swapImage = theme => {
    console.log(this.timer);
    clearInterval(this.timer);
    console.log(this.timer);
    const stepsize = 20;
    const loopMillis = 50;
    this.changeColor(theme, stepsize, loopMillis, () => {
      console.log("done swapping");
    });
    this.setState({ mainImage: theme.image, drifting: false });
  };

  // driftColor = theme => {
  //   console.log("drifting");
  //   const stepsize = 20;
  //   const loopMillis = 200;
  //   const timer = this.changeColor(theme, stepsize, loopMillis, () => {
  //     const nextTheme = this.getNextTheme(theme);
  //     this.driftColor(nextTheme);
  //   });
  //   this.timer = timer;
  // };

  getNextTheme = theme => {
    let flag = false;
    const nextTheme = this.themes.filter(th => {
      if (flag) {
        return th;
      }
      if (th === theme) {
        flag = true;
      }
    });
    return nextTheme.length > 0 ? nextTheme[0] : this.themes[0];
  };

  changeColor = (theme, stepsize, loopMillis, done) => {
    const { colors } = this.state;
    const originalColors = this.getParsedRGB(colors.darkbg1, colors.darkbg2);
    const newColors = this.getParsedRGB(
      theme.colors.darkbg1,
      theme.colors.darkbg2
    );

    let interColors = originalColors;

    const interColorInterval = this.getColorInterval(
      originalColors,
      newColors,
      stepsize
    );
    let countdown = stepsize;
    const timer = setInterval(() => {
      const { darkbg1, darkbg2 } = this.adjustInterColors(
        interColors,
        interColorInterval
      );
      this.setState({
        colors: {
          darkbg1: this.buildRGB(darkbg1),
          darkbg2: this.buildRGB(darkbg2)
        }
      });

      countdown--;
      if (countdown === 0) {
        clearInterval(timer);
        this.setState({ colors: theme.colors });
        done();
      }
    }, loopMillis);
    return timer;
  };

  getParsedRGB(darkbg1, darkbg2) {
    return {
      darkbg1: this.parseRGB(darkbg1),
      darkbg2: this.parseRGB(darkbg2)
    };
  }

  getColorInterval(originalColors, newColors, stepsize) {
    return {
      r1: (originalColors.darkbg1.r - newColors.darkbg1.r) / stepsize,
      g1: (originalColors.darkbg1.g - newColors.darkbg1.g) / stepsize,
      b1: (originalColors.darkbg1.b - newColors.darkbg1.b) / stepsize,
      r2: (originalColors.darkbg2.r - newColors.darkbg2.r) / stepsize,
      g2: (originalColors.darkbg2.g - newColors.darkbg2.g) / stepsize,
      b2: (originalColors.darkbg2.b - newColors.darkbg2.b) / stepsize
    };
  }

  adjustInterColors(interColors, interColorInterval) {
    interColors.darkbg1.r -= interColorInterval.r1;
    interColors.darkbg1.g -= interColorInterval.g1;
    interColors.darkbg1.b -= interColorInterval.b1;
    interColors.darkbg2.r -= interColorInterval.r2;
    interColors.darkbg2.g -= interColorInterval.g2;
    interColors.darkbg2.b -= interColorInterval.b2;
    return interColors;
  }

  parseRGB(hexCode) {
    return {
      r: parseInt(hexCode.substr(1, 2), 16),
      g: parseInt(hexCode.substr(3, 2), 16),
      b: parseInt(hexCode.substr(5, 2), 16)
    };
  }

  buildRGB(parsedRGB) {
    return (
      "rgb(" +
      Math.floor(parsedRGB.r) +
      "," +
      Math.floor(parsedRGB.g) +
      "," +
      Math.floor(parsedRGB.b) +
      ")"
    );
  }

  render() {
    return (
      <div className="resume">
        <NavBar />
        <div className="row">
          <div className="col-md-11">
            <Header
              colors={this.state.colors}
              mainImage={this.state.mainImage}
            />
            <Career colors={this.state.colors} />
            <Education colors={this.state.colors} />
            <Skills colors={this.state.colors} />
            <References colors={this.state.colors} />
            {/* <RecentWork colors={this.state.colors} /> */}
          </div>
          <div className="col-md-1">
            <div className="photoStrip">
              <PhotoStrip swapImage={this.swapImage} themes={this.themes} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Resume />, document.getElementById("root"));
