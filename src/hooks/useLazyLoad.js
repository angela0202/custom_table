import {useEffect, useState} from "react";

export function useLazyLoad (scrollRef, totalCount, isLoading, dataLength, loadMore) {
    const [isScrollEnd, setScrollEnd] = useState(null);
    const [totalCurrent, setTotalCurrent] = useState(0);

    useEffect(() => {
        const {current: scrollElement} = scrollRef;
        if (scrollRef && scrollElement) {
            const handleScroll = function (event) {
                const {scrollHeight, scrollTop, offsetHeight} = event.target;

                if (Math.ceil(offsetHeight + scrollTop) + 1 >= scrollHeight) {
                    !isScrollEnd && setScrollEnd(true);
                } else {
                    isScrollEnd && setScrollEnd(false);
                }
            };
            scrollElement.addEventListener("scroll", handleScroll);

            return () => scrollElement.removeEventListener("scroll", handleScroll);
        }
    }, [isScrollEnd]);

    useEffect(() => {
        // load new data if scroll position is at the bottom
        if (isScrollEnd && totalCurrent < totalCount && !isLoading) {
            loadMore();
        }
    }, [isScrollEnd]);

    useEffect(() => {
        // saving data total current length for calculating if more data needed
        if (!isLoading && dataLength) {
            if (dataLength < totalCurrent) {
                scrollRef.current.scrollTop = 0;
            }
            setTotalCurrent(dataLength);
        }
    }, [isLoading]);
}

export default useLazyLoad;