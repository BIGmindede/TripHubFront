import { classNames } from 'shared/lib/classNames/classNames';
import cls from './MediaFolder.module.scss';
import { Icon } from 'shared/UI/Icon/Icon';
import FolderBackIcon from 'shared/assets/IonFolderBack.svg';
import FolderFrontIcon from 'shared/assets/IonFolderFront.svg';
import { Image } from 'shared/UI/Image/Image';
import { ReactNode } from 'react';

interface MediaFolderProps {
  className?: string;
  thumbnailUrl?: string;
  title?: ReactNode;
  onClick: () => void;
}

export const MediaFolder = ({ className, thumbnailUrl, title, onClick }: MediaFolderProps) => {
  return (
    <div
      role='button'
      onClick={onClick}
      className={classNames(cls.mediaFolder, {}, [className])}
    >
      <Icon
        className={cls.folderBackIcon}
        Svg={FolderBackIcon}
        size={100}
      />
      <Image
        className={cls.folderThumbnail}
        src={`${process.env.MEDIA_STORAGE_URL}/${thumbnailUrl}`}
      />
      <Icon
        className={cls.folderFrontIcon}
        Svg={FolderFrontIcon}
        size={100}
      />
      {title}
    </div>
  )
}
