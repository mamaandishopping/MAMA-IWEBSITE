import requests
from bs4 import BeautifulSoup
import xml.etree.ElementTree as ET
import json

# === CONFIG ===
SITEMAP_URL = "https://globalautotechs.com/sitemap.xml"   # your sitemap
OUTPUT_FILE = "search.json"  # file that will be generated

def fetch_sitemap(url):
    r = requests.get(url)
    r.raise_for_status()
    root = ET.fromstring(r.content)
    namespace = {"ns": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    urls = [loc.text for loc in root.findall(".//ns:loc", namespace)]
    return urls

def fetch_page_data(url):
    try:
        r = requests.get(url, timeout=10)
        r.raise_for_status()
        soup = BeautifulSoup(r.text, "html.parser")

        title = soup.title.string.strip() if soup.title else "No Title"
        paragraph = soup.find("p")
        content = paragraph.get_text(strip=True) if paragraph else "No content available."

        return {
            "title": title,
            "url": url,
            "content": content
        }
    except Exception as e:
        print(f"❌ Failed to fetch {url}: {e}")
        return None

def main():
    urls = fetch_sitemap(SITEMAP_URL)
    print(f"🌍 Found {len(urls)} pages in sitemap")

    data = []
    for url in urls:
        print(f"📄 Fetching: {url}")
        page_data = fetch_page_data(url)
        if page_data:
            data.append(page_data)

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    print(f"✅ Done! {len(data)} pages saved to {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
