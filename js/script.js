document.addEventListener("DOMContentLoaded", function () {
  // ---- VARIABLES ---- //
  const words = ["World!?", "Visiteur!?", "Recruteur!?"];
  const nameWords = ["Cheikhrouhou", "SOUROUR"];
  const jobTitle = "Développeur Web - Fullstack";
  const changingWord = document.getElementById("changing-word");
  const nameElement = document.getElementById("name");
  const jobTitleElement = document.getElementById("job-title");
  const moreInfoBtn = document.getElementById("more-info-btn");

  const contactSection = document.getElementById("contact"); // Store the contact section element
  const parcoursSection = document.getElementById("parcours-section"); // Section parcours
  const temoignagesSection = document.getElementById("temoignages-section"); // Section témoignages
  const certifSection = document.getElementById("certifications-section"); // Section certifications
  const experienceSection = document.getElementById("experience-section"); // Section expérience
  const allSections = document.querySelectorAll("#about-me, #competence, #accueil, #contact, #parcours-section, #temoignages-section, #experience-section, #certifications-section"); // Toutes les sections
  const navLinks = document.querySelectorAll(".nav-links a");

  let index = 0, nameIndex = 0;
  let currentSection = "accueil"; // Track the current section displayed

  // ---- ANIMATIONS ---- //
  function typeEffect(targetElement, word, callback) {
    let position = 0;
    targetElement.textContent = "";
    function type() {
      if (position < word.length) {
        targetElement.textContent += word[position++];
        setTimeout(type, 150);
      } else if (callback) setTimeout(callback, 1000);
    }
    type();
  }

  function eraseEffect(targetElement, callback) {
    let currentText = targetElement.textContent;
    function erase() {
      if (currentText.length > 0) {
        currentText = currentText.slice(0, -1);
        targetElement.textContent = currentText;
        setTimeout(erase, 150);
      } else if (callback) callback();
    }
    erase();
  }

  function changeWord() {
    typeEffect(changingWord, words[index], () => {
      eraseEffect(changingWord, () => {
        index = (index + 1) % words.length;
        changeWord();
      });
    });
  }

  function showName() {
    const currentNameWord = nameWords[nameIndex];
    typeEffect(nameElement, currentNameWord, () => {
      if (nameIndex === 0) nameElement.textContent += " ";
      nameIndex = (nameIndex + 1) % nameWords.length;

      if (nameIndex !== 0) showName();
      else setTimeout(() => typeEffect(jobTitleElement, jobTitle, () => {
        moreInfoBtn.style.display = "inline-block";
      }), 1000);
    });
  }

  // ---- AFFICHAGE DES SECTIONS INDÉPENDANTES ---- //
  function showSection(sectionId) {
    // Masquer toutes les sections
    allSections.forEach((section) => {
      section.style.display = "none";
    });

    // Afficher la section sélectionnée
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      targetSection.style.display = "block";
      currentSection = sectionId;
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const sectionId = link.getAttribute("href").substring(1);
      showSection(sectionId);
    });
  });

  // ---- ACTION LIÉE AU PARCOURS ---- //
  const showParcoursLink = document.getElementById("show-parcours");
  showParcoursLink.addEventListener("click", (e) => {
    e.preventDefault();

    // Masquer toutes les sections avant d'afficher "parcours"
    allSections.forEach((section) => {
      section.style.display = "none";
    });

    // Afficher uniquement la section "parcours"
    parcoursSection.style.display = "block";
    parcoursSection.style.opacity = "1"; 
    currentSection = "parcours-section"; 
    window.scrollTo({ top: 0, behavior: "smooth" }); 
  });

  // ---- ACTION LIÉE AUX TÉMOIGNAGES ---- //
  const showTemoignagesLink = document.getElementById("show-temoignages");
  showTemoignagesLink.addEventListener("click", (e) => {
    e.preventDefault();

    // Masquer toutes les sections avant d'afficher "témoignages"
    allSections.forEach((section) => {
      section.style.display = "none";
    });

    // Afficher uniquement la section "témoignages"
    temoignagesSection.style.display = "block";
    temoignagesSection.style.opacity = "1";
    currentSection = "temoignages-section";
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ---- ACTION LIÉE AUX CERTIFICATIONS ---- //
  const certifBtn = document.querySelector('a[href="#certifications-section"]');
  certifBtn.addEventListener("click", (e) => {
    e.preventDefault();

    // Masquer toutes les autres sections
    allSections.forEach((section) => {
      section.style.display = "none";
    });

    // Afficher la section des certifications
    certifSection.style.display = "block";
    setTimeout(() => {
      certifSection.style.opacity = "1";
      certifSection.scrollIntoView({ behavior: "smooth" });
    }, 200);
  });

  // ---- ACTION LIÉE À L'EXPÉRIENCE ---- //
  const experienceBtn = document.getElementById("experience-btn");
  experienceBtn.addEventListener("click", (e) => {
    e.preventDefault();

    // Masquer toutes les sections avant d'afficher "expérience"
    allSections.forEach((section) => {
      section.style.display = "none";
    });

    // Afficher uniquement la section "expérience"
    experienceSection.style.display = "block";  
    experienceSection.style.opacity = "1"; 
    currentSection = "experience-section"; 
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ---- INITIALISATION ---- //
  setTimeout(() => {
    showName();
    setTimeout(changeWord, 500);
  }, 1000);

  showSection("accueil"); // Afficher la section accueil par défaut

  // Masquer la section de contact par défaut
  contactSection.style.display = "none"; 
});
document.getElementById("more-info-btn").addEventListener("click", function() {
  // Masquer toutes les sections sauf nav et footer
  var sections = document.querySelectorAll('body > *');
  sections.forEach(function(section) {
      if (section.id !== 'about-me' && section.tagName !== 'HEADER' && section.tagName !== 'FOOTER') {
          section.style.display = "none";
      }
  });

  // Afficher la section "À propos de moi"
  var aboutMeSection = document.getElementById("about-me");
  aboutMeSection.style.display = "block"; // Affiche la section "À propos de moi"
});
