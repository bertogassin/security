import { splitProps } from 'solid-js';

export interface PhosphorIconProps {
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  weight?: 'bold';
  class?: string;
}

const phosphorNames: Record<string, string> = {
  home: 'house',
  search: 'magnifying-glass',
  user: 'user',
  bell: 'bell',
  chat: 'chat-circle',
  location: 'map-pin',
  shield: 'shield',
  guard: 'shield-check',
  patrolCar: 'car',
  star: 'star',
  heart: 'heart',
  menu: 'list',
  close: 'x',
  check: 'check',
  plus: 'plus',
  minus: 'minus',
  chevronLeft: 'caret-left',
  chevronRight: 'caret-right',
  chevronDown: 'caret-down',
  chevronUp: 'caret-up',
  arrowLeft: 'arrow-left',
  arrowRight: 'arrow-right',
  settings: 'gear',
  phone: 'phone',
  sos: 'warning',
  camera: 'camera',
  wallet: 'wallet',
  creditCard: 'credit-card',
  briefcase: 'briefcase',
  document: 'file-text',
  car: 'car',
  bike: 'bicycle',
  wrench: 'wrench',
  verified: 'check-circle',
  upload: 'upload-simple',
  walking: 'person-simple-walk',
  list: 'list-bullets',
  filter: 'funnel',
  mic: 'microphone',
};

const sizeStyles: Record<string, string> = {
  sm: 'text-lg',
  md: 'text-xl',
  lg: 'text-2xl',
  xl: 'text-3xl',
};

export function PhosphorIcon(props: PhosphorIconProps) {
  const [local] = splitProps(props, ['name', 'size', 'weight', 'class']);
  const size = () => local.size || 'md';
  const phName = () => phosphorNames[local.name] || local.name;
  return (
    <i
      class={`ph-bold ph-${phName()} ${sizeStyles[size()]} inline-block leading-none ${local.class || ''}`}
      aria-hidden
    />
  );
}
