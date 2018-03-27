export default interface PropsType {
  visible?: boolean;
  direction?: 'top' | 'right' | 'bottom' | 'left';
  autoClose?: boolean;
  stayTime?: number;
  animationDuration?: number;
  onClose?: () => void;
  mask?: boolean;
  maskType?: 'transparent' | 'normal';
  onMaskClick?: () => void;
}
