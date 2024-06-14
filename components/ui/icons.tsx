import {
  Sun,
  ChevronLeft,
  Settings,
  type LucideIcon,
} from 'lucide-react-native';
import { cssInterop } from 'nativewind';

function iconWithClassName(icon: LucideIcon) {
  cssInterop(icon, {
    className: {
      target: 'style',
      nativeStyleToProp: {
        color: true,
        opacity: true,
      },
    },
  });
}

iconWithClassName(Sun);
iconWithClassName(ChevronLeft);
iconWithClassName(Settings);

export { Sun, ChevronLeft, Settings };
