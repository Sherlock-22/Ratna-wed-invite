const scrollHint = document.querySelector('.scroll-hint-cont');

document.body.style.overflowY = 'auto'; 

setTimeout(()=>{
    if(window.scrollY === 0) {
        scrollHint.classList.add("visible");
    };
},5000);

document.body.addEventListener('scroll', () => {
  scrollHint.classList.remove("visible");
});

const swingVideo = document.querySelector('.swing-video');
swingVideo.muted = true;

const submitButton = document.querySelector('.submit-button');
const popUp = document.querySelector('.rsvp-confirm-popup');
const form = document.querySelector('.rsvp-form');

const guestInput = document.getElementById("num-of-guests");
const radios = document.querySelectorAll('input[name="attendance"]');

radios.forEach(radio => {

    radio.addEventListener("change", () => {

        if (radio.value === "Wedding" || radio.value === "Reception" && radio.checked) {

            guestInput.required = true;
            guestInput.disabled = false;
            document.querySelector('#number-of-guests.field-container .field-header').innerHTML = `
                <p class="field-header">
                    Number Of Guests (Including Yourself) <span style="color: red;">*</span>
                </p>      
            `;

        } else if (radio.value === "No" && radio.checked) {

            guestInput.textContent = 'Not attending';
            guestInput.required = false;
            guestInput.disabled = true;
            guestInput.value = "";
            document.querySelector('#number-of-guests.field-container .field-header').innerHTML = `
                <p class="field-header">
                    Number Of Guests (Including Yourself)
                </p>      
            `;

        }

    });

});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    submitButton.disabled = true;
    submitButton.textContent = "Submitting...";

    const data = {
        name: document.getElementById("user-name").value,
        email: document.getElementById("user-email").value,
        phone: document.getElementById("user-number").value,
        attendance: document.querySelector('input[name="attendance"]:checked')?.value,
        guests: document.getElementById("num-of-guests").value,
        message: document.getElementById("user-message").value
    };

    fetch("https://script.google.com/macros/s/AKfycbxCA-ElyaHw_1XIB_jpswbi6D2X56-_X9FCVLUKtT05XkWDd79ezpgjytclFyK6gjgp4Q/exec", {
        method: "POST",
        body: JSON.stringify(data)
    }).then(response => response.json()).then(result => {
        popUp.showModal();

        confetti({
            particleCount: 200,
            spread: 120,
            origin: { y: 0.6 }
        });

        form.reset();

        submitButton.disabled = false;
        submitButton.textContent = "Submit";
        
        setTimeout(() => {
        popUp.close();
        submitButton.disabled = false;
        submitButton.textContent = "Submit";
        }, 5000);

    }).catch(error => {
        alert(`Sorry! Couldn't RSVP you. Please try again.`)
        submitButton.disabled = false;
        submitButton.textContent = "Submit";
    });
});

const weddingDate = dayjs('2026-09-13');

function countdown() {
    const now = dayjs();
    const diff = weddingDate.diff(now);
    let days = 0;
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    
    if(diff <= 0) {
        console.log('Wedding day!');
        days = 0;
        hours = 0;
        minutes = 0;
        seconds = 0;
        return;
    }

    {
        days = Math.floor(diff/(1000*60*60*24));
        hours = Math.floor((diff/(1000*60*60))%24);
        minutes = Math.floor((diff/(1000*60))%60);
        seconds = Math.floor((diff/1000)%60);

        document.querySelector('.days').innerHTML = days;
        document.querySelector('.hours').innerHTML = hours;
        document.querySelector('.minutes').innerHTML = minutes;
        document.querySelector('.seconds').innerHTML = seconds;
    }
}

setInterval(countdown,1000);
