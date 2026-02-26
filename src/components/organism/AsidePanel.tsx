import React, { useState, useEffect } from 'react';
import ToggleSwitch from '../atoms/ToggleSwitch';
import Button from '../atoms/Buttons';

const AsidePanel = ({ isOpen, onClose, article, isEditing, onSave, onEditClick }: any) => {
    const [headline, setHeadline] = useState('');
    const [author, setAuthor] = useState('');
    const [date, setDate] = useState('');
    const [body, setBody] = useState('');
    const [published, setPublished] = useState(false);
    const [files, setFiles] = useState<FileList | null>(null);
    const [previewImages, setPreviewImages] = useState<string[]>([]);

    useEffect(() => {
        if (article) {
            setHeadline(article.headline);
            setAuthor(article.author);
            setDate(article.publishDate);
            setBody(article.body);
            setPublished(article.published);
        } else {
            setHeadline('');
            setAuthor('');
            setDate('');
            setBody('');
            setPublished(false);
        }
    }, [article, isOpen]);

    if (!isOpen) return null;

    const formIsValid = headline !== '' && author !== '' && date !== '' && body !== '';

    const handleSaveClick = () => {
        onSave({
            id: article ? article.id : Math.random().toString(),
            headline,
            author,
            publishDate: date,
            image: previewImages[0] || null,
            body,
            published
        });
    };

    const isReadOnly = article && !isEditing;

    const imageToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const handleFiles = (files: FileList) => {
        const allowedExtensions = ['jpeg', 'png', 'gif'];
        const validFiles = Array.from(files).filter(file => {
            if (!file.name) return false;
            const extension = file.name.split('.').pop()?.toLowerCase();
            if (!extension) return false;
            return allowedExtensions.includes(extension);
        });
        if (validFiles.length < files.length) {
            alert('Some files were rejected. Only JPEG, PNG, and GIF formats are allowed.');
        }

        validFiles.forEach((file, index) => {
            imageToBase64(file).then(base64 => {
                localStorage.setItem(`uploadedImage_${index}`, base64);
            }).catch(error => {
                console.error('Error converting image to Base64:', error);
            });
        });

        setFiles(validFiles.length > 0 ? validFiles as unknown as FileList : null);
        setPreviewImages(validFiles.map(file => URL.createObjectURL(file)));
    };

    return (
        <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-lg border-l p-6 flex flex-col z-50">
            <button
                className="flex items-center gap-2 text-sky-400 hover:text-sky-600 transition-colors font-medium text-lg cursor-pointer self-end"
                onClick={onClose}>
                <span className="text-sm font-light leading-none">✕</span>
                <span className="tracking-wide text-sm">CLOSE</span>
            </button>
            <h2 className="text-xl font-bold mb-4 text-gray-800">
                {!article ? 'New Article' : isEditing ? 'Edit Article' : 'Article Details'}
            </h2>

            <div className="flex flex-col gap-4 flex-1">
                <div>
                    <label htmlFor='headline' className="block text-sm font-bold mb-1 text-gray-500">Headline *</label>
                    <input
                        id="headline"
                        type="text"
                        value={headline}
                        onChange={(e) => setHeadline(e.target.value)}
                        readOnly={isReadOnly}
                        className="w-full border p-2 rounded text-gray-700 border-gray-300"
                    />
                </div>

                <div>
                    <label htmlFor='author' className="block text-sm font-bold mb-1 text-gray-500">Author *</label>
                    <input
                        id="author"
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        readOnly={isReadOnly}
                        className="w-full border p-2 rounded text-gray-700 border-gray-300"
                    />
                </div>

                <div>
                    <label htmlFor='body' className="block text-sm font-bold mb-1 text-gray-500">Body *</label>
                    <textarea
                        id="body"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        readOnly={isReadOnly}
                        rows={4}
                        className="w-full border p-2 rounded text-gray-700 border-gray-300"
                    />
                </div>

                <div className="flex">
                    <div>
                        {previewImages.length > 0 && (
                            <div className="mt-4">
                                {previewImages.map((url, index) => (
                                    <img id={`preview-${index}`} key={index} src={`${localStorage.getItem(`uploadedImage_${index}`)}`} alt={`Preview ${index}`} className="w-32 h-32 object-cover rounded border" />
                                ))}
                            </div>
                        )}
                    </div>
                    <div>
                        <label htmlFor='Image' className="block text-sm font-bold mb-1 text-gray-500">Upload images *</label>
                        <input
                            id="Image"
                            type="file"
                            multiple
                            onChange={e => e.target.files && handleFiles(e.target.files)}
                            readOnly={isReadOnly}
                            className="w-full border p-2 rounded text-gray-700 border-gray-300"
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor='date' className="block text-sm font-bold mb-1 text-gray-500">Publication Date *</label>
                    <input
                        id="date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        readOnly={isReadOnly}
                        className="w-full border p-2 rounded text-gray-700 border-gray-300"
                    />
                </div>

                <div className="flex gap-3 justify-start items-center p-2 rounded text-gray-500">
                    <span>Publish</span>
                    <ToggleSwitch
                        isOn={published}
                        onToggle={() => setPublished(!published)}
                    />
                </div>
            </div>

            <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
                {isReadOnly ? (
                    <Button onClick={onEditClick}>Edit</Button>
                ) : (
                    <Button disabled={!formIsValid} onClick={handleSaveClick}>
                        {!article ? 'Save' : 'Update'}
                    </Button>
                )}
            </div>
        </div>
    );
}

export default AsidePanel;
