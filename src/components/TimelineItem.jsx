import React from 'react';
import '../assets/styles/TimelineItem.scss';

const TimelineItem = ({ year, text, image, reverse }) => {
    return (
        <div className={`d-flex flex-wrap ${reverse ? 'flex-row-reverse' : ''} mb-4`}>
            <div className="col-12 col-md-6 bg-light d-flex align-items-center justify-content-center p-4 text-center">
                <div>
                    <h4 className="fw-bold">{year}</h4>
                    <p className="text-muted">{text}</p>
                </div>
            </div>
            <div className="col-12 col-md-6">
                <img src={image} alt={`Image for ${year}`} className="img-fluid w-100 h-100 object-fit-cover" />
            </div>
        </div>
    );
};

export default TimelineItem;
