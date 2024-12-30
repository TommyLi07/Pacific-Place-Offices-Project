export interface IBagSelectionItemProps {
  imageSrc: string;
  title: string;
  desc: string;
  index?: number;
  onClick: (title: string) => void;
}
