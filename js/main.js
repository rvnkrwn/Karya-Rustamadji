/* =================

author: Karan Mhatre
email: me@karanmhatre.com
website: karanmhatre.com

================= */

AOS.init();

// Better to traverse the DOM thenleast possible
// you can use `var` instead of `const` for legacy browser support
const loadingScreen = document.querySelector('.loading-screen')
const mainNavigation = document.querySelector('.main-navigation')

// Function to add and remove the page transition screen
function pageTransitionIn() {
		return gsap
				.to(loadingScreen, { duration: .5, scaleY: 1, transformOrigin: 'bottom left'})
}

function pageTransitionOut(container) {
		return gsap
				.timeline({ delay: 1 })
				.add('start')
				.to(loadingScreen, {
						duration: 0.5,
						scaleY: 0,
						skewX: 0,
						transformOrigin: 'top left',
						ease: 'power1.out'
				}, 'start')
				.call(contentAnimation, [container], 'start')
}

function contentAnimation(container) {

		$(container.querySelector('.green-heading-bg')).addClass('show')

		return gsap
				.timeline()
				.from(container.querySelector('.is-animated'), {
						duration: 0.5,
						translateY: 10,
						opacity: 0,
						stagger: 0.4
				})
				.from(mainNavigation, { duration: .5, translateY: -10, opacity: 0})
}

$(function() {
		barba.init({
				// We don't want "synced transition"
				// because both content are not visible at the same time
				// and we don't need next content is available to start the page transition
				// sync: true,
				transitions: [{
						// NB: `data` was not used.
						// But usually, it's safer (and more efficient)
						// to pass the right container as a paramater to the function
						// and get DOM elements directly from it
						async leave(data) {
								// Not needed with async/await or promises
								// const done = this.async();

								await pageTransitionIn()
								// No more needed as we "await" for pageTransition
								// And i we change the transition duration, no need to update the delay…
								// await delay(1000)

								// Not needed with async/await or promises
								// done()

								// Loading screen is hiding everything, time to remove old content!
								data.current.container.remove()
						},

						async enter(data) {
								await pageTransitionOut(data.next.container)
						},
						// Variations for didactical purpose…
						// Better browser support than async/await
						// enter({ next }) {
						//   return pageTransitionOut(next.container);
						// },
						// More concise way
						// enter: ({ next }) => pageTransitionOut(next.container),

						async once(data) {
								await contentAnimation(data.next.container);
						}
				}]
		});

});

window.addEventListener('scroll', function (e) {
		if(window.scrollY > 100) {
				document.querySelector('.scrollTop').classList.remove('hidden')
		} else {
				document.querySelector('.scrollTop').classList.add('hidden')
		}
})
