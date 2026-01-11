import os
import glob
from PIL import Image

def optimize_images():
    public_dir = os.path.join(os.getcwd(), 'public')
    images = glob.glob(os.path.join(public_dir, 'portfolio_*.png'))
    
    print(f"Found {len(images)} images to optimize.")
    
    for img_path in images:
        try:
            filename = os.path.basename(img_path)
            name_without_ext = os.path.splitext(filename)[0]
            new_path = os.path.join(public_dir, f"{name_without_ext}.jpg")
            
            with Image.open(img_path) as img:
                # Resize (max width 1600 to be safe for retina, but 1280 is fine too. Let's go 1600)
                img.thumbnail((1600, 1600))
                
                # Convert to RGB (drop alpha if any, JPEGs don't support it)
                if img.mode in ('RGBA', 'P'):
                    img = img.convert('RGB')
                
                # Save as JPG
                img.save(new_path, 'JPEG', quality=80, optimize=True)
                
                print(f"Optimized: {filename} -> {os.path.basename(new_path)}")
                
        except Exception as e:
            print(f"Error optimizing {img_path}: {e}")

if __name__ == "__main__":
    optimize_images()
