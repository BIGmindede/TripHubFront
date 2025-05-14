import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useEffect, useRef, useState } from 'react';
import cls from './ImageGallery.module.scss';
import { Image } from 'shared/UI/Image/Image';
import { Modal } from 'features/Modal';
import { WidgetWrapper } from 'features/WidgetWrapper/WidgetWrapper';
import { Typography } from 'shared/UI/Typography/Typography';
import { Button, ButtonTheme } from 'shared/UI/Button/Button';
import { AddImageForm } from './AddImageForm/AddImageForm';
import { EditImageForm } from './EditImageForm/EditImageForm';
import { MODAL_IDS } from 'shared/config/ModalContext/modalIds';
import { MediaMetadata } from 'shared/config/store/types/media';

interface ImageGalleryProps {
    images: MediaMetadata[];
    title?: string;
    description?: string;
    onImageAdd?: (data: {
        file: File;
        description: string;
        geodata?: { lat: number; lon: number };
    }) => void;
    onImageEdit?: (data: {
        id: string | number,
        description: string;
        geodata?: { lat: number; lon: number };
    }) => void;
    onImageDelete?: (id: string | number) => void;
}

interface ProcessedImage extends MediaMetadata {
    aspectRatio: number;
    width: number;
}

const ROW_HEIGHT = 250; // Фиксированная высота ряда
const SPACING = 10; // Отступ между изображениями
const MIN_IMAGES_IN_ROW = 1; // Минимальное количество изображений в ряду

export const ImageGallery = memo((props: ImageGalleryProps) => {
    const {
        images,
        title,
        description,
        onImageAdd,
        onImageEdit,
        onImageDelete
    } = props;

    const [rows, setRows] = useState<ProcessedImage[][]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const [selectedImage, setSelectedImage] = useState<MediaMetadata | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    // Функция для загрузки размеров изображений
    const loadImageDimensions = (image: MediaMetadata): Promise<ProcessedImage> => {
        return new Promise((resolve) => {
            const img = document.createElement('img');
            img.src=`http://localhost:9000/media/${image.mediaUrl}`;
            img.onload = () => {
                resolve({
                    ...image,
                    aspectRatio: img.width / img.height,
                    width: img.width,
                });
            };
        });
    };

    // Функция для разбиения изображений на ряды
    const processImages = async () => {
        if (!containerRef.current) return;

        const containerWidth = containerRef.current.offsetWidth;
        const processedImages = await Promise.all(images.map(loadImageDimensions));
        
        const rows: ProcessedImage[][] = [];
        let currentRow: ProcessedImage[] = [];
        let currentRowWidth = 0;

        const addRow = (row: ProcessedImage[]) => {
            if (row.length > 0) {
                rows.push(row);
            }
        };

        processedImages.forEach((image, index) => {
            const baseWidth = ROW_HEIGHT * image.aspectRatio;
            const exceedsWidth = currentRowWidth + baseWidth + SPACING > containerWidth;
            const isLastImage = index === processedImages.length - 1;
            const hasMinImages = currentRow.length >= MIN_IMAGES_IN_ROW;

            if (hasMinImages && exceedsWidth) {
                addRow(currentRow);
                currentRow = [image];
                currentRowWidth = baseWidth;
            }
            else {
                currentRow.push(image);
                currentRowWidth += baseWidth + SPACING;
            }
            if (isLastImage) {
                addRow(currentRow);
            }
        });

        setRows(rows);
    };

    useEffect(() => {
        processImages();
        window.addEventListener('resize', processImages);
        return () => window.removeEventListener('resize', processImages);
    }, [images]);

    // Вычисляем ширину для каждого изображения в ряду
    const calculateImageWidths = (row: ProcessedImage[], isLastRow: boolean) => {
        if (!containerRef.current) return new Array(row.length).fill(0);

        const containerWidth = containerRef.current.offsetWidth;
        const totalSpacing = (row.length - 1) * SPACING;

        // Для последнего ряда, если он не заполнен полностью
        if (isLastRow) {
            const naturalWidths = row.map(image => ROW_HEIGHT * image.aspectRatio);
            const totalNaturalWidth = naturalWidths.reduce((sum, width) => sum + width, 0) + totalSpacing;
            
            if (totalNaturalWidth < containerWidth) {
                return naturalWidths;
            }
        }

        const availableWidth = containerWidth - totalSpacing;
        const totalAspectRatio = row.reduce((sum, img) => sum + img.aspectRatio, 0);
        
        return row.map(image => 
            (availableWidth * (image.aspectRatio / totalAspectRatio))
        );
    };

    const onImageClick = (image: MediaMetadata) => {
        setSelectedImage(image);
    };

    const onModalClose = () => {
        setSelectedImage(null);
    };

    const handleAddClick = () => {
        setIsAddModalOpen(true);
    };

    const handleAddSubmit = (data: {
        file: File;
        description: string;
        location?: { lat: number; lon: number };
    }) => {
        onImageAdd?.(data);
        setIsAddModalOpen(false);
    };

    const handleEditClick = () => {
        setIsEditModalOpen(true);
    };

    const handleEditSubmit = (data: {
        description: string;
        location?: { lat: number; lon: number };
    }) => {
        if (selectedImage && onImageEdit) {
            onImageEdit({
                id: selectedImage.id,
                ...data
            });
        }
        setIsEditModalOpen(false);
    };

    const handleDeleteImage = () => {
        if (selectedImage && onImageDelete) {
            onImageDelete(selectedImage.id);
        }
        setSelectedImage(null);
    };

    return (
        <WidgetWrapper heading={"Медиа"} className={cls.imageGalleryWrapper}>
            {description && (
                <Typography 
                    variant="paragraph"
                    size="m"
                    className={cls.description}
                >
                    {description}
                </Typography>
            )}
            <div ref={containerRef} className={cls.imageGallery}>
                {rows.map((row, rowIndex) => {
                    const isLastRow = rowIndex === rows.length - 1;
                    const rowClassName = classNames(
                        cls.row,
                        { [cls.lastRow]: isLastRow }
                    );
                    
                    return (
                        <div 
                            key={rowIndex} 
                            className={rowClassName}
                            style={{ height: ROW_HEIGHT }}
                        >
                            {row.map((image, index) => (
                                <div
                                    key={image.id}
                                    className={classNames(
                                        cls.imageWrapper,
                                        { [cls.imageWrapperLastRow]: isLastRow }
                                    )}
                                    onClick={() => onImageClick(image)}
                                >
                                    <Image
                                        src={`http://localhost:9000/media/${image.mediaUrl}`}
                                        alt={"Картинка"}
                                        className={classNames(
                                            cls.image,
                                            { [cls.lastRowImage]: isLastRow }
                                        )}
                                    />
                                </div>
                            ))}
                        </div>
                    );
                })}
                
                <Modal
                    isOpen={!!selectedImage}
                    onClose={onModalClose}
                    title={'Просмотр изображения'}
                    modalId={MODAL_IDS.IMAGE_PREVIEW}
                    className={cls.modal}
                >
                    {selectedImage && (
                        <>
                            <Image
                                src={`http://localhost:9000/media/${selectedImage.mediaUrl}`}
                                alt={"Картинка"}
                                className={cls.modalImage}
                            />
                            <div className={cls.modalActions}>
                                {onImageEdit && (
                                    <Button
                                        theme={ButtonTheme.BASIC}
                                        className={cls.editButton}
                                        onClick={handleEditClick}
                                    >
                                        Изменить
                                    </Button>
                                )}
                                {onImageDelete && (
                                    <Button
                                        theme={ButtonTheme.OUTLINE}
                                        className={cls.deleteButton}
                                        onClick={handleDeleteImage}
                                    >
                                        Удалить
                                    </Button>
                                )}
                            </div>
                        </>
                    )}
                </Modal>

                <Modal
                    isOpen={isAddModalOpen}
                    onClose={() => setIsAddModalOpen(false)}
                    title="Добавление изображения"
                    modalId={MODAL_IDS.ADD_IMAGE}
                    className={cls.modal}
                >
                    <AddImageForm
                        onSubmit={handleAddSubmit}
                        onCancel={() => setIsAddModalOpen(false)}
                    />
                </Modal>

                <Modal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    title="Редактировать"
                    modalId={MODAL_IDS.EDIT_IMAGE}
                    className={cls.modal}
                >
                    <EditImageForm
                        image={selectedImage!}
                        onSubmit={handleEditSubmit}
                        onCancel={() => setIsEditModalOpen(false)}
                    />
                </Modal>
            </div>
            {onImageAdd && (
                <Button
                    theme={ButtonTheme.BASIC}
                    className={cls.addButton}
                    onClick={handleAddClick}
                >
                    Добавить
                </Button>
            )}
        </WidgetWrapper>
    );
}); 