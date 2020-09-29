import React, {useEffect} from 'react';
import YouTube from 'react-youtube';

const Video = (props) => {
	const {id, activeChange, active} = props;

	useEffect(() => {
		const windowClickHandler = (evt) => {
			if (evt.target.classList.contains('video')) {
				activeChange();
			}
		};
		document.body.style.overflow = 'hidden';
		window.addEventListener('click', windowClickHandler);
		return () => {
			window.removeEventListener('click', windowClickHandler);
			document.body.style.overflow = '';
		};
	}, [active]);

	return <YouTube containerClassName="video" className="video-item" videoId={id} />;
};

export default Video;
