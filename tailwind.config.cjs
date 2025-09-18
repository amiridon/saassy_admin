/**** Tailwind Configuration ****/
/**
 * We use a custom prefix to avoid collisions with any Bootstrap classes shipped by the Blazor template.
 */
module.exports = {
  content: [
    './src/SaassyAdmin.Client/Client/**/*.{razor,html,cshtml}',
    './src/SaassyAdmin.Client/Server/Pages/**/*.{cshtml,razor}',
    './src/SaassyAdmin.Client/Shared/**/*.{razor,cs}',
  ],
  darkMode: 'media',
  prefix: 'tw-',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Helvetica Neue', 'Helvetica', 'Arial', 'ui-sans-serif', 'system-ui']
      },
      colors: {
        brand: {
          DEFAULT: '#6366f1',
          accent: '#8b5cf6',
          pink: '#ec4899'
        }
      },
      backgroundImage: {
        'brand-radial': 'radial-gradient(circle at 20% 20%, rgba(99,102,241,.08), transparent 60%)',
        'brand-gradient': 'linear-gradient(90deg,#6366f1,#8b5cf6 40%,#ec4899)'
      },
      boxShadow: {
        'glass': '0 4px 16px -2px rgba(0,0,0,.25)',
        'smx': '0 2px 4px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24)'
      },
      borderRadius: {
        'mdx': '0.75rem'
      }
    }
  },
  plugins: [
    function ({ addComponents, addUtilities, theme }) {
      addComponents({
        '.tw-glass-tile': {
          'backdrop-filter': 'blur(12px) saturate(160%)',
          background: 'rgba(255,255,255,.06)',
          border: '1px solid rgba(255,255,255,.1)',
          padding: '1.25rem 1.5rem',
          'border-radius': theme('borderRadius.mdx'),
          width: '100%',
          'max-width': '320px'
        }
      });
      addUtilities({
        '.tw-gradient-text': {
          background: theme('backgroundImage.brand-gradient'),
          '-webkit-background-clip': 'text',
          'background-clip': 'text',
          color: 'transparent'
        }
      });
    }
  ]
};
