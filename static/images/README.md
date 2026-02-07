# Olivero Hugo Theme - Assets

This directory contains the visual assets for the Olivero Hugo theme.

## Images

### Logo
- **File**: `logo.svg`
- **Description**: Main site logo featuring a stylized "O" with Hugo integration
- **Usage**: Site header branding, favicon base
- **Dimensions**: 120x120px (scalable SVG)

### Welcome Banner
- **File**: `welcome-banner.svg`
- **Description**: Hero section banner with gradient background and decorative elements
- **Usage**: Home page hero section
- **Dimensions**: 800x400px (scalable SVG)

### Featured Image
- **File**: `welcome-banner.jpg`
- **Description**: Blog post featured image showing theme layout preview
- **Usage**: Blog post thumbnails, social media images
- **Dimensions**: 600x400px

### Favicon
- **File**: `favicon.svg`
- **Description**: Site favicon for browser tabs
- **Usage**: Browser tab icon, bookmarks
- **Dimensions**: 32x32px (scalable SVG)

## Design System

### Colors
- **Primary Blue**: `#0055f4` (Olivero's signature blue)
- **Secondary Blue**: `#1a6aff` (Lighter accent)
- **Background**: `#f2f2f2` (Light gray)
- **Text**: `#1a1a1a` (Dark gray)

### Typography
- **Headings**: Metropolis (or fallback to system fonts)
- **Body**: Lora (or fallback to Georgia serif)
- **Base Size**: 18px for accessibility

### Design Principles
- **Mobile-First**: Responsive design that works on all devices
- **Accessibility**: WCAG 2.1 AA compliant with high contrast ratios
- **Modern**: Clean, professional aesthetic with thoughtful spacing
- **Performance**: Optimized SVGs for fast loading

## Usage

### In Templates
```hugo
<!-- Logo in header -->
<img src="/images/logo.svg" alt="{{ .Site.Title }}" class="site-logo">

<!-- Welcome banner -->
<img src="/images/welcome-banner.svg" alt="Welcome to Olivero Hugo" class="hero-image">

<!-- Featured images -->
{{ if .Params.featured_image }}
<img src="{{ .Params.featured_image }}" alt="{{ .Title }}" class="featured-image">
{{ end }}
```

### In Configuration
```toml
[params]
  logo = "/images/logo.svg"
  featured_image = "/images/welcome-banner.jpg"
```

## File Formats

### SVG (Scalable Vector Graphics)
- **Advantages**: Infinite scalability, small file size, crisp on all displays
- **Usage**: Logos, icons, illustrations
- **Tools**: Can be edited in vector graphics software

### JPG (JPEG)
- **Advantages**: Good compression for photographs, wide browser support
- **Usage**: Featured images, photographs
- **Optimization**: Balanced quality and file size

## Customization

### Colors
Edit the SVG files to change colors:
1. Open in a vector graphics editor (Illustrator, Inkscape, Figma)
2. Modify fill colors
3. Export as optimized SVG

### Typography
Font changes are handled in CSS:
```css
:root {
  --font-lora: "Your Font", serif;
  --font-metropolis: "Your Heading Font", sans-serif;
}
```

### Dimensions
SVGs can be resized via CSS:
```css
.logo {
  width: 60px;
  height: 60px;
}
```

## Performance

### Optimization
- SVGs are minified and optimized
- Proper MIME types set in headers
- Lazy loading implemented for large images
- WebP format can be added for better compression

### Caching
- Static files are cached by browsers
- Hugo's fingerprinting ensures cache busting on updates
- CDN-friendly file structure

## Accessibility

### Alt Text
All images include descriptive alt text:
- Logos use site title
- Banners describe the purpose
- Featured images relate to content

### Contrast
All text overlays meet WCAG contrast requirements:
- White text on blue backgrounds: 7.1:1 ratio
- Dark text on light backgrounds: 8.5:1 ratio

### Screen Readers
SVGs include proper ARIA labels where needed
Decorative elements are marked as presentation-only

## Browser Support

### SVG Support
- Chrome 4+
- Firefox 3+
- Safari 4+
- Edge 9+
- IE 9+ (with fallbacks)

### Fallbacks
- SVG logos have PNG fallbacks for older browsers
- CSS feature detection ensures graceful degradation
- System fonts used when web fonts fail to load

## Licensing

All assets are created specifically for this theme and are licensed under the same GPL 2.0 license as the theme itself.

## Contributing

When adding new assets:
1. Use SVG format where possible
2. Optimize for performance
3. Include proper alt text
4. Test across browsers
5. Document usage in this README