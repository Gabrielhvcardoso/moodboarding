import { KeyboardEventHandler, useContext, useEffect, useRef, useState } from 'react';
import { useInput } from '@/hooks';
import { BoardContext } from '@/app/board/[slug]/page';

import styles from './quick-bar-image-menu.module.scss';
import { Upload } from 'react-bootstrap-icons';
import { Manrope } from 'next/font/google';

const ManropeFont = Manrope({
    subsets: ['latin'],
    weight: '700'
});

export default function QuickBarImageMenu() {
    const { addNode } = useContext(BoardContext);

    const urlInput = useInput('');
    const [urlInputError, setUrlInputError] = useState(true);


    useEffect(() => { urlInput.ref.current && urlInput.ref.current.focus() }, [urlInput.ref]);

    function addImage() {
        addNode({
            id: crypto.randomUUID(),
            type: 'image',
            position: { x: 200, y: 200 },
            data: {}
        });
    }

    const handleUrlInputEnterPress: KeyboardEventHandler<HTMLInputElement> = (event) => {
        if (event.key === 'Enter') {
            alert('a');
        }
    }

    return (
        <form className={styles.imageMenu}>
            <span className={styles.imageMenuTitle}>Image upload</span>

            <div className={styles.formRow}>
                <input
                    ref={urlInput.ref}
                    name="imageurl"
                    type="href"
                    placeholder="Image URL"
                    className={ManropeFont.className}

                    value={urlInput.value}
                    onChange={urlInput.onChange}
                    onKeyDown={handleUrlInputEnterPress}
                />
                <button role="button" title="Enviar arquivo">
                    <Upload />
                </button>
            </div>

            <small className={styles.formFieldHint}>Extensões suportadas:<br/>jpg, jpeg, png, webp, avif, gif</small>
        </form>
    )
}
