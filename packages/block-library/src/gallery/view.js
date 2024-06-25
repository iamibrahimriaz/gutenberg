/**
 * WordPress dependencies
 */
import { store, getContext, getElement } from '@wordpress/interactivity';

const { state, actions, callbacks } = store(
	'core/gallery',
	{
        state: {
            // galleryRef: null,
            // size: 0,
            // currentImageIndex: 0,
        },
        actions: {
            // previousImage(e) {
            //     e.stopPropagation();
            //     console.log('previousImage', e)
            //     // const { ref } = getElement();
            //     // ref.previous();
            // },
            // nextImage(e) {
            //     e.stopPropagation();
            //     const ctx = getContext();
            //     console.log('nextImage', ctx.currentImageIndex)
            //     // const { ref } = getElement();
            //     // ref.next();
            // }
        },
        callbacks: {
            init() {
                const { ref } = getElement();
                const ctx = getContext();
                ctx.galleryRef = ref;
            },
            // getCurrentImage(imageRef) {
            //     const currentIndex = 0;
            //     const ctx = getContext();
            //     for (let i = 0; i < ctx.galleryRef.children.length; i++) {
            //         if (ctx.galleryRef.children[i].children[0] === imageRef) {
            //             currentIndex = i;
            //             break;
            //         }
            //     }
            //     return currentIndex;
            // }
        },
	},
	{
		lock: false,
	},
);