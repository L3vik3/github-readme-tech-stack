import { Card, newCard } from "../types/card";

class UrlBuilder {
  private url: string;
  private defaultCard: Card;

  public constructor() {
    this.url = "https://github-readme-tech-stack.vercel.app/api/cards?";
    this.defaultCard = newCard();
  }

  public title(title: string): UrlBuilder {
    if (title === this.defaultCard.title) {
      return this;
    }

    this.url += `title=${encodeURI(title)}&`;
    return this;
  }

  public theme(theme: string): UrlBuilder {
    if (theme === this.defaultCard.theme) {
      return this;
    }

    this.url += `theme=${theme}&`;
    return this;
  }

  public showBorder(showBorder: boolean): UrlBuilder {
    if (showBorder === this.defaultCard.showBorder) {
      return this;
    }

    this.url += `showBorder=${showBorder}&`;
    return this;
  }

  public hideBg(hideBg: boolean): UrlBuilder {
    if (hideBg === this.defaultCard.hideBg) {
      return this;
    }

    this.url += `hideBg=${hideBg}&`;
    return this;
  }

  public hideTitle(hideTitle: boolean): UrlBuilder {
    if (hideTitle === this.defaultCard.hideTitle) {
      return this;
    }

    this.url += `hideTitle=${hideTitle}&`;
    return this;
  }

  public align(align: string): UrlBuilder {
    if (align === this.defaultCard.align) {
      return this;
    }

    this.url += `align=${align}&`;
    return this;
  }

  public titleAlign(titleAlign: string): UrlBuilder {
    if (titleAlign === this.defaultCard.titleAlign) {
      return this;
    }

    this.url += `titleAlign=${titleAlign}&`;
    return this;
  }

  public borderRadius(borderRadius: string): UrlBuilder {
    if (borderRadius === this.defaultCard.borderRadius) {
      return this;
    }

    this.url += `borderRadius=${borderRadius}&`;
    return this;
  }

  public gap(gap: string): UrlBuilder {
    if (gap === this.defaultCard.gap) {
      return this;
    }

    this.url += `gap=${gap}&`;
    return this;
  }

  public lineHeight(lineHeight: string): UrlBuilder {
    if (lineHeight === this.defaultCard.lineHeight) {
      return this;
    }

    this.url += `lineHeight=${lineHeight}&`;
    return this;
  }

  public fontSize(fontSize: string): UrlBuilder {
    if (fontSize === this.defaultCard.fontSize) {
      return this;
    }

    this.url += `fontSize=${fontSize}&`;
    return this;
  }

  public fontWeight(fontWeight: string): UrlBuilder {
    if (fontWeight === this.defaultCard.fontWeight) {
      return this;
    }

    this.url += `fontWeight=${fontWeight}&`;
    return this;
  }

  public fontFamily(fontFamily: string): UrlBuilder {
    if (fontFamily === this.defaultCard.fontFamily) {
      return this;
    }

    this.url += `fontFamily=${encodeURI(fontFamily)}&`;
    return this;
  }

  public lineCount(lc: number): UrlBuilder {
    this.url += `lineCount=${lc}&`;
    return this;
  }

  public build(): string {
    const lastChar = this.url.at(-1);
    if (lastChar === "?" || lastChar === "&") {
      this.url = this.url.slice(0, -1);
    }

    return this.url;
  }
}

export const generateLink = ({
  title,
  theme,
  align,
  lines,
  showBorder,
  borderRadius,
  fontWeight,
  fontSize,
  fontFamily,
  lineHeight,
  gap,
  hideBg,
  hideTitle,
  titleAlign,
}: Card): string => {
  let res = new UrlBuilder()
    .title(title)
    .align(align)
    .titleAlign(titleAlign)
    .borderRadius(borderRadius)
    .fontFamily(fontFamily)
    .fontSize(fontSize)
    .fontWeight(fontWeight)
    .showBorder(showBorder)
    .lineHeight(lineHeight)
    .lineCount(lines.length)
    .theme(theme)
    .gap(gap)
    .hideBg(hideBg)
    .hideTitle(hideTitle)
    .build();

  for (const l of lines) {
    // if the line doesn't contain badges
    if (l.badges.length < 1) {
      continue;
    }

    let line = `&line${l.lineNumber}=`;
    for (const b of l.badges) {
      const color = b.color.replace("#", "");
      line += `${encodeURI(b.iconName)},${encodeURI(b.label)},${color};`;
    }

    res += line;
  }

  return res;
};

export const generateHex = (): string => {
  return "#" + Math.random().toString(16).slice(2, 8).toLowerCase();
};

export const getRandomTechnology = (): string => {
  const technologies: string[] = [
    "javascript",
    "typescript",
    "python",
    "react",
    "angular",
    "svelte",
    "tailwindcss",
    "rust",
    "go",
    "bootstrap",
    "electron",
    "express",
    "spring",
    "css3",
    "html5",
    "ruby",
    "prisma",
    "node.js",
    "babel",
    "docker",
    "postman",
    "trello",
    "google",
  ];

  return technologies[Math.floor(Math.random() * technologies.length)];
};
