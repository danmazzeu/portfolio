const linksWhatsapp = document.querySelectorAll('.whatsapp');

const wppNumber = '16993630686';

linksWhatsapp.forEach(link => {
    link.href = 'https://wa.me/55' + wppNumber;
});