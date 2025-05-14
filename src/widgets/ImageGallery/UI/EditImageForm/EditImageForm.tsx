import { classNames } from 'shared/lib/classNames/classNames';
import { useState } from 'react';
import cls from './EditImageForm.module.scss';
import { Form } from 'features/Form';
import { LocationPicker } from 'features/LocationPicker';
import { TextArea } from 'shared/UI/TextArea/TextArea';
import { MediaMetadata } from 'shared/config/store/types/media';

interface EditImageFormProps {
    className?: string;
    image: MediaMetadata;
    onSubmit: (data: {
        description?: string;
        location?: { lat: number; lon: number };
    }) => void;
    onCancel: () => void;
}

export const EditImageForm = (props: EditImageFormProps) => {
    const {
        className,
        image,
        onSubmit,
        onCancel
    } = props;

    const [description, setDescription] = useState(image?.description ?? '');
    const [location, setLocation] = useState<{ lat: number; lon: number } | null>(
        image ? JSON.parse(image.geodata) : null
    );

    const handleSubmit = () => {
        console.log('handleSubmit');
        onSubmit({
            description,
            location: location || undefined
        });
    };

    return (
        <Form
            className={classNames(cls.editImageForm, {}, [className])}
            onSubmit={handleSubmit}
            submitText="Сохранить"
        >
            <div className={cls.preview}>
                <img src={image?.mediaUrl} alt="Preview" />
            </div>

            <TextArea
                value={description}
                onChange={setDescription}
                placeholder="Описание изображения"
                className={cls.textArea}
            />

            <div className={cls.mapWrapper}>
                <LocationPicker
                    onLocationSelect={setLocation}
                    useGeolocation={true}
                />
            </div>
        </Form>
    );
}; 