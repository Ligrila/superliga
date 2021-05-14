import React, { useEffect } from 'react';
import { useRecoilSnapshot } from 'recoil';

const DebugObserver = () => {
    const snapshot = useRecoilSnapshot();
    useEffect(() => {
        // console.debug('The following atoms were modified:');
        for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
            // console.debug(node.key);
        }
    }, [snapshot]);

    return null;
}

export default DebugObserver;