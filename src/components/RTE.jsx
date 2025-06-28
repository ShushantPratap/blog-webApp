import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

function RTE({
    name,
    control,
    label,
    defaultValue = ''
}) {
    return (
        <div className='text-editor'>
            {label && <label>{label}</label>}
            <Controller
                name={name || 'content'}
                control={control}
                render={({ field: { onChange } }) => (
                    <Editor
                        apiKey='0zbgtweat0dqv19xyl4hmsm3hk0n2p5axow07t9cetu8miku'
                        initialValue={defaultValue}
                        init={{
                            selector: 'textarea',
                            min_height: 600,
                            menubar: true,
                            plugins: [
                                "image",
                                "advlist",
                                "autolink",
                                "lists",
                                "link",
                                "image",
                                "charmap",
                                "preview",
                                "anchor",
                                "searchreplace",
                                "visualblocks",
                                "code",
                                "fullscreen",
                                "insertdatetime",
                                "media",
                                "table",
                                "code",
                                "help",
                                "wordcount",
                                "anchor",
                                "autoresize"
                            ],
                            toolbar:
                                "paste undo redo | fontfamily fontsize fontsizeinput blocks | bold italic underline forecolor subscript superscript | backcolor blockquote lineheight alignleft aligncenter alignright alignjustify link | bullist numlist outdent indent |removeformat image styles | code fullscreen help",
                            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                        }}
                        onEditorChange={onChange}
                    />
                )}
            />
        </div>
    );
}

export default RTE;