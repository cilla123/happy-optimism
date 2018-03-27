import { BaseDatePickerViewProps } from '../DatePickerView/PropsType';

export interface BaseDatePickerProps extends BaseDatePickerViewProps {
  visible?: boolean;
  title?: string;
  okText?: string;
  cancelText?: string;
  onOk?: (value?: object) => void;
  onCancel?: () => void;
  onMaskClick?: () => void;
  children?: any;
}
