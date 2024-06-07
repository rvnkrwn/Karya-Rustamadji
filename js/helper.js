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
