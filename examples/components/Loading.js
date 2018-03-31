import React from 'react';

import '../styles/components/Loading.scss';

export default function DocLoading({ error, timedOut, pastDelay }) {
    if (error) {
        return <Error />;
    }

    if (timedOut) {
        return <Error />;
    }

    if (pastDelay) {
        return <Loading />;
    }

    return null;
}

function Loading() {
    return (
        <div className="happy-optimism-loading">
            <div className="happy-optimism-loading-ripple">
                <div />
                <div />
            </div>
        </div>
    );
}

function Error() {
    return (
        <div className="happy-optimism-loading-error">Oops! An error occurred.</div>
    );
}
