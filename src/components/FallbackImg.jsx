import React, { useEffect, useState } from 'react'

const PLACEHOLDER = 'https://i.ibb.co/0j3PQZb/banner1.jpg'

const FallbackImg = ({ src, alt, className, style, ...rest }) => {
    const [source, setSource] = useState(src || PLACEHOLDER)

    useEffect(() => {
        setSource(src || PLACEHOLDER)
    }, [src])
    return (
        <img
            src={source}
            alt={alt}
            className={className}
            style={style}
            referrerPolicy="no-referrer"
            crossOrigin="anonymous"
            loading="lazy"
            decoding="async"
            onError={() => setSource(PLACEHOLDER)}
            {...rest}
        />
    )
}

export default FallbackImg
