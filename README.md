# Olivero Hugo Theme

A **complete 1:1 replication** of Drupal's award-winning Olivero theme, now available for Hugo static site generator.

![Olivero Hugo Theme](https://img.shields.io/badge/Hugo-0.155+-ff4081?style=for-the-badge&logo=hugo)
![License](https://img.shields.io/badge/License-GPL_2.0-blue.svg?style=for-the-badge)
![Accessibility](https://img.shields.io/badge/Accessibility-WCAG_2.1_AA-green.svg?style=for-the-badge)

## ✨ Features

### 🎨 **Design System**
- **Olivero's Signature Colors**: Vivid blue (#0055f4) with neutral grays
- **Typography**: Lora for body text, Metropolis for headings (18px base)
- **Spacing System**: Consistent spacing using CSS custom properties
- **Grid Layout**: Modern CSS Grid-based responsive layouts

### 📱 **Responsive Navigation**
- **Mobile-First Header**: Scroll-based visibility that hides/shows on scroll
- **Mobile Navigation Panel**: Smooth slide-out menu with hamburger toggle
- **Desktop Dropdown Menus**: Multi-level navigation with hover and keyboard support
- **Secondary Navigation**: Top bar with user actions and language switcher

### ♿ **Accessibility First**
- **WCAG 2.1 AA Compliant**: Semantic HTML5, ARIA attributes, keyboard navigation
- **Focus Management**: Visible focus indicators, skip links, proper tab order
- **RTL Language Support**: Complete right-to-left language support
- **Screen Reader Support**: Landmark roles, descriptive labels, error handling

### 🎯 **Content Layouts**
- **Home Page**: Hero section, posts grid, feature cards, call-to-action sections
- **Blog Posts**: Card-based layout with images, categories, metadata, read more links
- **Pages**: Full-width content with proper typography, blockquotes, code blocks
- **Forms**: Modern, accessible form styling with validation states

### ⚡ **Performance & SEO**
- **Minimal JavaScript**: Only essential navigation interactions
- **Optimized Assets**: Efficient CSS with custom properties, minified JavaScript
- **SEO Ready**: Open Graph meta tags, Twitter Cards, structured data
- **Fast Loading**: Hugo's static site generation with optimized asset pipeline

## 🚀 Quick Start

### 📋 Prerequisites
- Hugo 0.155.0 or higher
- Git

### 📦 Installation

1. **Clone this repository**:
   ```bash
   git clone https://github.com/yourusername/olivero-hugo.git
   cd olivero-hugo
   ```

2. **Start the development server**:
   ```bash
   hugo server --buildDrafts
   ```

3. **Open your browser** and navigate to `http://localhost:1313`

### ⚙️ Configuration

Customize your site in `hugo.toml`:

```toml
[params]
  description = "Your site description"
  author = "Your Name"
  logo = "/images/logo.svg"
  show_share_buttons = true

[params.social]
  twitter = "https://twitter.com/yourusername"
  github = "https://github.com/yourusername"
```

## 📁 Project Structure

```
olivero-hugo/
├── themes/olivero/           # Theme files
│   ├── layouts/              # Hugo templates
│   ├── assets/               # CSS and JavaScript
│   └── static/               # Theme static assets
├── content/                  # Your content
├── static/                   # Site static assets
├── hugo.toml                # Site configuration
└── README.md                # This file
```

## 🎨 Customization

### 🎨 Colors
Edit CSS variables in `themes/olivero/assets/css/main.css`:

```css
:root {
  --color-primary: #0055f4;
  --color-text: #1a1a1a;
  --color-background: #ffffff;
}
```

### ✏️ Typography
```css
:root {
  --font-lora: "Lora", Georgia, serif;
  --font-metropolis: "Metropolis", sans-serif;
  --font-size-base: 1.125rem;
}
```

### 📐 Layout
```css
:root {
  --container-max-width: 1200px;
  --grid-gap: 1.5rem;
  --space-8: 2rem;
}
```

## 🌐 Browser Support

| Browser | Version | Features |
|---------|---------|----------|
| Chrome | 60+ | Full support |
| Firefox | 55+ | Full support |
| Safari | 12+ | Full support |
| Edge | 79+ | Full support |

## 📄 License

This theme is licensed under the **GPL 2.0 License**, the same as the original Olivero theme for Drupal.

## 👨‍💻 Author

**Val Paliy** - [https://valticus.pro](https://valticus.pro)

A passionate developer specializing in modern web technologies, accessibility, and creating beautiful, functional themes for the Hugo community.

## 🤝 Contributing

We welcome contributions! Please:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature-name`
3. **Make your changes**
4. **Test thoroughly** across browsers and devices
5. **Submit a pull request**

### 📝 Development Guidelines

- Follow Hugo conventions for file organization
- Use semantic HTML5 for better accessibility
- Write clean CSS with custom properties
- Document your code with clear comments
- Test for WCAG 2.1 AA compliance

## 📞 Support

- **Documentation**: Check this README and inline comments
- **Issues**: Report bugs via GitHub Issues
- **Community**: Join discussions in GitHub Discussions
- **Email**: Contact maintainer for premium support

## 🙏 Acknowledgments

- **Drupal Olivero Team**: For creating the original award-winning theme
- **Hugo Team**: For the amazing static site generator
- **Contributors**: Everyone who helps improve this theme

## 📈 Roadmap

### 🌙 Version 1.1
- [ ] Dark mode support
- [ ] Additional color schemes
- [ ] Enhanced search functionality

### 🌍 Version 1.2
- [ ] Multi-language improvements
- [ ] Advanced customization options
- [ ] Performance optimizations

---

**Built with ❤️ by [Val Paliy](https://valticus.pro) for the Hugo community**

If you like this theme, please ⭐ it on GitHub and consider sharing it with others!

## 📜 License

Copyright © 2026 [Val Paliy](https://valticus.pro). All rights reserved.

This theme is licensed under the **GPL 2.0 License**, the same as the original Olivero theme for Drupal.
