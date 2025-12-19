// Warm Theme Configuration for Taskler

export const warmTheme = {
  colors: {
    // Primary Colors
    primary: {
      main: '#FF8A50',      // Warm Orange
      dark: '#E67E3C',      // Warm Orange Dark
      light: '#FFB380',     // Warm Orange Light
      hover: '#E67E3C'
    },
    secondary: {
      main: '#E85C47',      // Warm Red
      dark: '#D44835',      // Warm Red Dark
      light: '#FF7A66'      // Warm Red Light
    },
    accent: {
      main: '#FFD166',      // Warm Yellow
      dark: '#F0C054',      // Warm Yellow Dark
      light: '#FFE099'      // Warm Yellow Light
    },
    
    // Background Colors
    background: {
      default: '#FEF9F3',   // Cream
      paper: '#FFFBF7',     // White with warm tint
      dark: '#F5EFE7'       // Darker cream
    },
    
    // Text Colors
    text: {
      primary: '#2C1810',   // Dark Brown
      secondary: '#5C4033', // Warm Gray
      disabled: '#B8A08B',  // Desaturated warm gray
      hint: '#8B6F47'       // Caption text
    },
    
    // Border Colors
    border: {
      main: '#E8D7C3',      // Warm Tan
      light: '#F5EAD8',     // Lighter tan
      dark: '#D1B89A'       // Darker tan
    },
    
    // Priority Colors
    priority: {
      high: '#E85C47',      // Warm Red
      medium: '#FF8A50',    // Warm Orange
      low: '#6BBF59'        // Warm Green
    },
    
    // Status Colors
    status: {
      success: '#6BBF59',   // Warm Green
      warning: '#FF8A50',   // Warm Orange
      error: '#E85C47',     // Warm Red
      info: '#4B7BEC'       // Warm Blue
    },
    
    // Column Colors
    column: {
      backlog: '#F5F5F5',   // Gray
      inProgress: '#E3F2FD', // Warm Blue tint
      done: '#E8F5E9'       // Warm Green tint
    }
  },
  
  // Typography
  typography: {
    fontFamily: {
      primary: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
      mono: 'Menlo, Monaco, "Courier New", monospace'
    },
    fontSize: {
      xs: '0.75rem',        // 12px
      sm: '0.875rem',       // 14px
      base: '1rem',         // 16px
      lg: '1.125rem',       // 18px
      xl: '1.25rem',        // 20px
      '2xl': '1.5rem',      // 24px
      '3xl': '2rem',        // 32px
      '4xl': '2.5rem'       // 40px
    },
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    }
  },
  
  // Spacing
  spacing: {
    xs: '0.25rem',    // 4px
    sm: '0.5rem',     // 8px
    md: '0.75rem',    // 12px
    lg: '1rem',       // 16px
    xl: '1.5rem',     // 24px
    '2xl': '2rem',    // 32px
    '3xl': '3rem'     // 48px
  },
  
  // Border Radius
  borderRadius: {
    sm: '0.25rem',    // 4px
    md: '0.5rem',     // 8px
    lg: '0.75rem',    // 12px
    xl: '1rem',       // 16px
    full: '9999px'
  },
  
  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 1px 3px 0 rgba(139, 111, 71, 0.1), 0 1px 2px 0 rgba(139, 111, 71, 0.06)',
    lg: '0 4px 6px -1px rgba(139, 111, 71, 0.1), 0 2px 4px -1px rgba(139, 111, 71, 0.06)',
    xl: '0 10px 15px -3px rgba(139, 111, 71, 0.1), 0 4px 6px -2px rgba(139, 111, 71, 0.05)',
    '2xl': '0 25px 50px -12px rgba(139, 111, 71, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)'
  },
  
  // Transitions
  transitions: {
    fast: '200ms',
    base: '300ms',
    slow: '500ms',
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)'
    }
  },
  
  // Breakpoints
  breakpoints: {
    xs: '320px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  },
  
  // Z-index
  zIndex: {
    hide: -1,
    base: 0,
    dropdown: 1000,
    sticky: 1100,
    fixed: 1200,
    modalBackdrop: 1300,
    modal: 1400,
    popover: 1500,
    tooltip: 1600
  }
};

// Helper function to get warm color variants
export const getWarmColor = (colorPath) => {
  const path = colorPath.split('.');
  let value = warmTheme.colors;
  
  for (const key of path) {
    value = value[key];
    if (!value) return null;
  }
  
  return value;
};

// Tailwind CSS class mappings for warm theme
export const warmTailwindClasses = {
  // Button classes
  button: {
    primary: 'bg-orange-500 hover:bg-orange-600 text-white focus:ring-orange-500',
    secondary: 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-500',
    ghost: 'bg-transparent hover:bg-orange-50 text-orange-600 border-2 border-orange-500',
    disabled: 'bg-gray-300 text-gray-500 cursor-not-allowed'
  },
  
  // Input classes
  input: {
    base: 'bg-white border-amber-200 focus:border-orange-500 focus:ring-2 focus:ring-yellow-400 text-amber-950',
    error: 'border-red-500 focus:border-red-500 focus:ring-red-400'
  },
  
  // Card classes
  card: {
    base: 'bg-white border-amber-200 shadow-md hover:shadow-lg',
    warm: 'bg-orange-50 border-amber-200'
  },
  
  // Badge classes
  badge: {
    high: 'bg-red-500 text-white',
    medium: 'bg-orange-500 text-white',
    low: 'bg-green-500 text-white'
  },
  
  // Text classes
  text: {
    primary: 'text-amber-950',
    secondary: 'text-amber-700',
    disabled: 'text-gray-400',
    link: 'text-blue-500 hover:text-blue-600'
  },
  
  // Background classes
  background: {
    cream: 'bg-orange-50',
    paper: 'bg-white',
    dark: 'bg-amber-100'
  }
};

export default warmTheme;
