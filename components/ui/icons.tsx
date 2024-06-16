import {
  Sun,
  ChevronLeft,
  Settings,
  type LucideIcon,
  Ellipsis,
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
iconWithClassName(Ellipsis);

export { Sun, ChevronLeft, Settings, Ellipsis };
