import { classNames } from 'shared/lib/classNames/classNames';
import { ChangeEvent, useState } from 'react';
import cls from './ImagePicker.module.scss';
import { Modal } from 'features/Modal';
import { Form } from 'features/Form';
import { MODAL_IDS } from 'shared/config/ModalContext/modalIds';

interface ImagePickerProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (file: File) => void;
    title?: string;
}

export const ImagePicker = (props: ImagePickerProps) => {
    const {
        isOpen,
        onClose,
        onSave,
        title = 'Выбор изображения'
    } = props;

    const [file, setFile] = useState<File | null>(null);
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
            onSave(file);
            onClose();
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            modalId={MODAL_IDS.IMAGE_PICKER}
            className={cls.modal}
        >
            <Form
                className={classNames(cls.imagePicker, {}, [])}
                onSubmit={handleSubmit}
                submitText="Сохранить"
                onCancel={onClose}
            >
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
            </Form>
        </Modal>
    );
}; 