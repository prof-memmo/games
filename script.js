document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const menuIcon = menuToggle.querySelector('i');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        if (navLinks.classList.contains('active')) {
            menuIcon.classList.replace('ph-list', 'ph-x');
        } else {
            menuIcon.classList.replace('ph-x', 'ph-list');
        }
    });

    // Close mobile menu when clicking a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuIcon.classList.replace('ph-x', 'ph-list');
        });
    });

    // Intersection Observer for scroll animations
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // Navbar style on scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });

    // Sitename Correction (Global)
    const siteTitle = "Prof. Memmo - Games&Co.";
    
    // Legal Content Data
    const legalData = {
        privacy: {
            title: "🔒 Privacy Policy",
            content: `
                <h4>1. Titolare del trattamento</h4>
                <p>Il titolare del trattamento è Guglielmo Piersanti, contattabile all’indirizzo email: prof.memmo@gmail.com</p>
                
                <h4>2. Finalità del sito</h4>
                <p>“Prof. Memmo - Games&Co.” è un sito di condivisione di materiale didattico, utilizzato a scopo educativo e ludico e senza fini di lucro.</p>
                
                <h4>3. Dati raccolti</h4>
                <p>Il sito può raccogliere i seguenti dati personali: indirizzo e-mail; informazioni di utilizzo relative ai giochi online (punteggi, attività didattiche ecc.); messaggio inviato tramite modulo di contatto; dati tecnici forniti automaticamente dalla piattaforma (es. tipo di dispositivo, dati di log).</p>
                
                <h4>4. Finalità del trattamento</h4>
                <p>I dati vengono trattati esclusivamente per consentire l’accesso all’app e alle sue funzionalità, gestire l’esperienza didattica e le classifiche interne, migliorare il funzionamento del servizio, rispondere alle richieste inviate tramite il modulo di contatto, fornire assistenza o informazioni richieste dall’utente. Non vengono utilizzati per scopi commerciali o pubblicitari.</p>
                
                <h4>5. Base giuridica</h4>
                <p>Il trattamento dei dati si basa sull’utilizzo dell’app e sul consenso dell’utente.</p>
                
                <h4>6. Conservazione dei dati</h4>
                <p>I dati sono trattati in modo lecito e sicuro. Non vengono venduti né ceduti a terzi. Sono mantenuti solo per il tempo necessario al funzionamento didattico dell’app o su richiesta o in maniera autonoma tramite il profilo utente, salvo obblighi di legge. Vengono utilizzati servizi terzi per l’archiviazione dei dati (Firebase).</p>
                
                <h4>8. Diritti dell’utente</h4>
                <p>L'utente può richiedere in qualsiasi momento: accesso ai propri dati, rettifica o cancellazione, limitazione del trattamento, revoca del consenso.</p>
                
                <h4>9. Cookie</h4>
                <p>Il sito non utilizza cookie di profilazione.</p>
                
                <h4>9. Utenti minori</h4>
                <p>L’app è destinata a un uso didattico. Per l'utilizzo da parte di minori, è responsabilità di un adulto assicurare le autorizzazioni necessarie. I genitori o tutori possono richiedere la cancellazione dei dati contattando il titolare.</p>
                
                <h4>10. Modifiche alla Policy</h4>
                <p>La presente informativa può essere aggiornata. Gli utenti verranno informati in caso di modifiche rilevanti.</p>
                
                <h4>11. Riferimenti normativi</h4>
                <p>Questa informativa è redatta in conformità al GDPR.</p>
            `
        },
        terms: {
            title: "📜 Termini e Condizioni",
            content: `
                <p><strong>Ultimo aggiornamento: 31/04/26</strong></p>
                
                <h4>1. Titolare del sito</h4>
                <p>Il presente sito web è gestito da: Guglielmo Piersanti – Email di contatto: prof.memmo@gmail.com</p>
                
                <h4>2. Accettazione dei termini</h4>
                <p>L’accesso e l’utilizzo del sito implicano l’accettazione dei presenti Termini e Condizioni. Se non si accettano tali condizioni, si invita a non utilizzare il sito.</p>
                
                <h4>3. Descrizione del servizio</h4>
                <p>Il sito ha finalità informative ed educative. Gli utenti possono: consultare i contenuti disponibili e usufruire della piattaforma di gioco, contattare il gestore tramite modulo di contatto.</p>
                
                <h4>4. Utilizzo del sito</h4>
                <p>L’utente si impegna a utilizzare il sito in modo lecito e corretto, evitando di: inviare messaggi offensivi, illeciti o spam, tentare di compromettere la sicurezza del sito, utilizzare il sito per scopi fraudolenti.</p>
                
                <h4>5. Modulo di contatto</h4>
                <p>L’utente è responsabile dei dati e dei contenuti inviati tramite il modulo di contatto.</p>
                
                <h4>6. Proprietà intellettuale</h4>
                <p>Tutti i contenuti del sito (testi, materiali, ecc.) sono di proprietà del titolare, salvo diversa indicazione. È vietata la copia, distribuzione o utilizzo senza autorizzazione.</p>
                
                <h4>7. Limitazione di responsabilità</h4>
                <p>Il sito è fornito “così com’è”. Il titolare non garantisce l’assenza di errori o interruzioni. Il titolare non è responsabile per danni derivanti dall’utilizzo del sito o contenuti inviati dagli utenti.</p>
                
                <h4>8. Link esterni</h4>
                <p>Il sito può contenere link a siti esterni. Il titolare non è responsabile del contenuto o delle politiche di tali siti.</p>
                
                <h4>9. Modifiche</h4>
                <p>Il titolare si riserva il diritto di modificare i presenti Termini in qualsiasi momento.</p>
                
                <h4>10. Legge applicabile</h4>
                <p>I presenti Termini sono regolati dalla normativa italiana e dal GDPR.</p>
            `
        }
    };

    // Inject Content Modal into DOM if it doesn't exist
    if (!document.getElementById('content-modal')) {
        const modalHTML = `
            <div class="content-modal-overlay" id="content-modal">
                <div class="content-modal-container">
                    <div class="content-modal-header">
                        <h3 id="modal-title"></h3>
                        <button class="content-modal-close" id="modal-close">&times;</button>
                    </div>
                    <div class="content-modal-body" id="modal-body"></div>
                    <div class="content-modal-footer">
                        <button class="btn btn-primary" id="modal-confirm" style="background: var(--color-primary); color: white; border: none; width: 100%; font-weight: 700; padding: 1.25rem; border-radius: 16px; cursor: pointer; font-size: 1.1rem; box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.2);">Ho capito</button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    const contentModal = document.getElementById('content-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const modalClose = document.getElementById('modal-close');
    const modalConfirm = document.getElementById('modal-confirm');
    
    let currentLegalType = null;
    let privacyAccepted = false;
    let termsAccepted = false;

    const openLegalModal = (type) => {
        if (!legalData[type]) return;
        currentLegalType = type;
        modalTitle.innerHTML = legalData[type].title;
        modalBody.innerHTML = legalData[type].content;
        contentModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeLegalModal = () => {
        contentModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    modalClose.addEventListener('click', closeLegalModal);
    modalConfirm.addEventListener('click', () => {
        if (currentLegalType === 'privacy') privacyAccepted = true;
        if (currentLegalType === 'terms') termsAccepted = true;
        
        // Custom events for specific page logic
        document.dispatchEvent(new CustomEvent('legalAccepted', { detail: { type: currentLegalType } }));
        
        closeLegalModal();
    });

    // Delegate footer links and other legal links
    document.addEventListener('click', (e) => {
        const legalLink = e.target.closest('[data-legal]');
        if (legalLink) {
            e.preventDefault();
            openLegalModal(legalLink.getAttribute('data-legal'));
        }
    });

    // Contact Page Specific Logic
    const contactForm = document.querySelector('.contact-form');
    const acceptanceModal = document.getElementById('legal-modal');
    
    if (contactForm && acceptanceModal) {
        const confirmAcceptanceBtn = document.getElementById('confirm-legal');
        const closeAcceptanceBtn = document.getElementById('close-modal');
        const linkPrivacy = document.getElementById('link-privacy');
        const linkTerms = document.getElementById('link-terms');

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            acceptanceModal.classList.add('active');
        });

        const updateAcceptanceButton = () => {
            if (privacyAccepted && termsAccepted) {
                confirmAcceptanceBtn.classList.remove('btn-disabled');
            }
        };

        // Update link UI when documents are read
        document.addEventListener('legalAccepted', (e) => {
            const type = e.detail.type;
            if (type === 'privacy') {
                linkPrivacy.classList.add('visited');
                const icon = linkPrivacy.querySelector('.status-icon');
                if (icon) icon.className = 'ph-fill ph-check-circle status-icon';
            }
            if (type === 'terms') {
                linkTerms.classList.add('visited');
                const icon = linkTerms.querySelector('.status-icon');
                if (icon) icon.className = 'ph-fill ph-check-circle status-icon';
            }
            updateAcceptanceButton();
        });

        closeAcceptanceBtn.addEventListener('click', () => {
            acceptanceModal.classList.remove('active');
        });

        confirmAcceptanceBtn.addEventListener('click', () => {
            if (privacyAccepted && termsAccepted) {
                acceptanceModal.classList.remove('active');
                alert('Grazie! Il tuo messaggio è stato inviato correttamente.');
                contactForm.reset();
                // Reset state
                privacyAccepted = false;
                termsAccepted = false;
                confirmAcceptanceBtn.classList.add('btn-disabled');
                linkPrivacy.classList.remove('visited');
                linkTerms.classList.remove('visited');
                const icons = acceptanceModal.querySelectorAll('.status-icon');
                icons.forEach(ico => ico.className = 'ph ph-circle status-icon');
            }
        });
    }
});
