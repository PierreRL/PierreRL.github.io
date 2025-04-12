// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "About",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-blog",
          title: "Blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-projects",
          title: "Projects",
          description: "Mostly coding and music!",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "post-",
      
        title: "🥏🥏🥏",
      
      description: "The Sport of Ultimate Frisbee",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/ultimate-frisbee/";
        
      },
    },{id: "post-from-the-andes",
      
        title: "From The Andes",
      
      description: "A South American Escapade",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/from-the-andes/";
        
      },
    },{id: "news-i-finished-my-semester-1-exams",
          title: 'I finished my semester 1 exams!',
          description: "",
          section: "News",},{id: "news-i-started-rebuilding-this-website",
          title: 'I started rebuilding this website.',
          description: "",
          section: "News",},{id: "news-i-will-be-interning-at-jane-street-as-a-quant-trader-this-summer",
          title: 'I will be interning at Jane Street as a Quant Trader this summer....',
          description: "",
          section: "News",},{id: "news-i-will-be-mastering-in-computer-science-at-ubc-vancouver-with-kevin-leyton-brown-and-serena-wang-my-research-will-focus-on-machine-learning",
          title: 'I will be Mastering in Computer Science at UBC Vancouver with Kevin Leyton-Brown...',
          description: "",
          section: "News",},{id: "projects-shortbread",
          title: 'Shortbread',
          description: "A News Delivery App for",
          section: "Projects",handler: () => {
              window.location.href = "/projects/shortbread/";
            },},{id: "projects-i-want-to-fly",
          title: 'I want to Fly',
          description: "A solo piano composition",
          section: "Projects",handler: () => {
              window.location.href = "/projects/I-want-to-fly/";
            },},{id: "projects-style-transfer-with-cnns",
          title: 'Style Transfer with CNNs',
          description: "Digital -&gt; Film",
          section: "Projects",handler: () => {
              window.location.href = "/projects/cnns/";
            },},{id: "projects-lead-sheet-transcription",
          title: 'Lead Sheet Transcription',
          description: "My 4th year Dissertation on ML &amp; Music",
          section: "Projects",handler: () => {
              window.location.href = "/projects/lead-sheet-transription/";
            },},{id: "projects-topic-segmentation-with-llms",
          title: 'Topic Segmentation with LLMs',
          description: "Some reseach I did on an internship. Submitting to ACL 2025.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/llms-for-text-segmentation/";
            },},{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/PierreRL", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/pierremackenzie", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=d5Xa73cAAAAJ", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
