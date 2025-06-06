import { classNames } from 'shared/lib/classNames/classNames';
import { ChangeEvent, useState } from 'react';
import cls from './AddImageForm.module.scss';
import { Form } from 'features/Form';
import { LocationPicker } from 'features/LocationPicker';
import { TextArea } from 'shared/UI/TextArea/TextArea';

interface AddImageFormProps {
    className?: string;
    onSubmit: (data: {
        file: File;
        description?: string;
        geodata?: { lat: number; lon: number };
    }) => void;
}

export const AddImageForm = (props: AddImageFormProps) => {
    const {
        className,
        onSubmit,
    } = props;

    const [file, setFile] = useState<File | null>(null);
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            const url = URL.createObjectURL(selectedFile);
            setPreviewUrl(url);
        }
    };

    const handleSubmit = () => {
        if (file) {
            onSubmit({
                file,
                description,
                geodata: location
            });
        }
    };

    return (
        <Form
            className={classNames(cls.addImageForm, {}, [className])}
            onSubmit={handleSubmit}
            submitText="Добавить"
        >
            <div className={cls.formInputs}>
                <div className={cls.fileInput}>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        id="imageInput"
                        className={cls.input}
                    />
                    <label htmlFor="imageInput" className={cls.label}>
                        {previewUrl ? (
                            <div className={cls.preview}>
                                <img src={previewUrl} alt="Preview" />
                            </div>
                        ) : (
                            <div className={cls.placeholder}>
                                Нажмите для выбора изображения
                            </div>
                        )}
                    </label>
                </div>
                <TextArea
                    label="Описание"
                    value={description}
                    onChange={setDescription}
                    placeholder="Описание изображения"
                    className={cls.textArea}
                />
            </div>

            <div className={cls.mapWrapper}>
                <LocationPicker
                    onLocationSelect={setLocation}
                    useGeolocation={true}
                />
            </div>
        </Form>
    );
}; 