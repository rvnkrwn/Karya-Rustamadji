function delay(n) {
		n = n || 2000
		// Keep official documentation wording, done -> resolve
		// and make it more concise
		return new Promise(resolve => {
				setTimeout(resolve, n)
		})
}


function scrollToSection(id) {
		document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
}

		document.addEventListener('DOMContentLoaded', function() {
		// Menambahkan event listener untuk semua link
		var links = document.querySelectorAll('a');
		links.forEach(function(link) {
		link.addEventListener('click', function(event) {
		// Mencegah perilaku default dari link (pemuatan halaman baru)
		event.preventDefault();

		// Mendapatkan URL tujuan dari link
		let url = this.getAttribute('href');

		// Memuat ulang halaman
		window.location.href = url;
});
});
});
