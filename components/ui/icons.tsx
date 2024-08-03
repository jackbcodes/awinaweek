import {
  Sun,
  ChevronRight,
  Settings,
  type LucideIcon,
  Ellipsis,
  Star,
  Check,
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
iconWithClassName(ChevronRight);
iconWithClassName(Settings);
iconWithClassName(Ellipsis);
iconWithClassName(Star);
iconWithClassName(Check);

export { Sun, ChevronRight, Settings, Ellipsis, Star, Check };
