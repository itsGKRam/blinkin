import { nanoid } from 'nanoid';
import { DotsSixVertical, Plus } from 'phosphor-react';
import { useState } from 'react';

export default function Unique() {
    const allowedTags = [
        {
            tag: 'h1',
            label: 'Heading 1',
            attributes: '',
        },
        {
            tag: 'h2',
            label: 'Heading 2',
            attributes: '',
        },
        {
            tag: 'h3',
            label: 'Heading 3',
            attributes: '',
        },
        {
            tag: 'p',
            label: 'Paragraph',
            attributes: '',
        },
        {
            tag: 'input',
            label: 'Input (Text)',
            type: 'text',
            attributes: '',
        },
        {
            tag: 'input',
            label: 'Input (Email)',
            type: 'email',
            attributes: '',
        },
        {
            label: 'Input (Password)',
            tag: 'input',
            type: 'password',
            attributes: '',
        },
    ];

    const [blocks, setBlocks] = useState([
        {
            id: nanoid(),
            tag: 'h1',
            text: '',
            type: '',
        },
    ]);

    const [openMenu, setOpenMenu] = useState(false);
    const [current, setCurrent] = useState(0);

    const onKeyDown = (e) => {
        if (e.key === '/') {
            e.preventDefault();
            setOpenMenu(true);
        }
        if (openMenu) {
            if (e.key === 'Enter') {
                e.preventDefault();
                setOpenMenu(false);
            } else if (e.key === ' ') {
                e.preventDefault();
                setOpenMenu(false);
            } else if (e.key === 'Backspace') {
                e.preventDefault();
                setOpenMenu(false);
            }
        }
        if (e.key === 'Enter') {
            e.preventDefault();
            setBlocks([
                ...blocks,
                {
                    id: nanoid(),
                    tag: 'p',
                    text: '',
                    type: '',
                    attributes: '',
                },
            ]);
            setOpenMenu(false);
        }
    };

    return (
        <div className=' blinkIn-w-screen blinkIn-h-screen  blinkIn-flex blinkIn-items-center blinkIn-justify-center blinkIn-gap-2 blinkIn-flex-col'>
            {blocks.map((item, key) => {
                return (
                    <div
                        key={key}
                        className=' blinkIn-group blinkIn-w-1/2 blinkIn-flex blinkIn-flex-row blinkIn-gap-2 blinkIn-items-center'
                    >
                        <div className=' blinkIn-hidden group-hover:blinkIn-flex'>
                            <Plus
                                className=' blinkIn-cursor-pointer'
                                onClick={() => {
                                    setOpenMenu(true);
                                }}
                                size={24}
                                weight='duotone'
                            />
                            <DotsSixVertical size={24} weight='duotone' />
                        </div>
                        <div
                            className='blinkIn-w-full  blinkIn-p-2 blinkIn-rounded-md blinkIn-outline-none'
                            contentEditable={true}
                            dangerouslySetInnerHTML={{
                                __html:
                                    item.tag === 'input'
                                        ? `<${item?.tag} ${item?.attributes} type="${item?.type}" placeholder="${item?.text}"/>`
                                        : `<${item?.tag ?? 'p'} ${
                                              item?.attributes ?? null
                                          }>${
                                              item?.text.length > 0
                                                  ? item?.text
                                                  : 'Enter text here'
                                          }</${item?.tag ?? 'p'}>`,
                            }}
                            tabIndex={key + 1}
                            onKeyDown={(e) => {
                                setCurrent(key);
                                onKeyDown(e);
                            }}
                            onInput={(e) => {
                                const val = [...blocks];
                                val[current].text = e.currentTarget.innerText;
                                setBlocks(val);
                            }}
                        />
                    </div>
                );
            })}
            {openMenu && (
                <div className=' blinkIn-bg-gray-300 blinkIn-flex blinkIn-items-center blinkIn-flex-col blinkIn-p-2 blinkIn-gap-1 blinkIn-rounded-sm'>
                    {allowedTags.map((item, key) => (
                        <div
                            key={key}
                            onClick={() => {
                                const val = [...blocks];
                                val[current].tag = item.tag;
                                val[current].type = item.type ?? null;
                                setBlocks(val);
                                setOpenMenu(false);
                            }}
                            className=' blinkIn-p-1 blinkIn-rounded-sm hover:blinkIn-bg-zinc-400 blinkIn-w-full blinkIn-cursor-pointer'
                        >
                            {item.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
