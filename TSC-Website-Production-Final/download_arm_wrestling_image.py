#!/usr/bin/env python3
"""
Download arm wrestling image from Unsplash
"""

import requests
import os

def download_arm_wrestling_image():
    # Using a high-quality arm wrestling image from Unsplash
    # Photo by LOGAN WEAVER on Unsplash: Shows two people arm wrestling
    image_url = "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    
    # Download directory
    images_dir = "images"
    if not os.path.exists(images_dir):
        os.makedirs(images_dir)
    
    # Filename for the arm wrestling image
    filename = "arm-wrestling-competition-hero.jpg"
    filepath = os.path.join(images_dir, filename)
    
    try:
        print(f"Downloading arm wrestling image from Unsplash...")
        response = requests.get(image_url, stream=True)
        response.raise_for_status()
        
        with open(filepath, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        
        print(f"✅ Successfully downloaded: {filepath}")
        print(f"📏 File size: {os.path.getsize(filepath)} bytes")
        return filepath
        
    except requests.exceptions.RequestException as e:
        print(f"❌ Error downloading image: {e}")
        return None
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        return None

if __name__ == "__main__":
    download_arm_wrestling_image()
