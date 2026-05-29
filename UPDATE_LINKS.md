# How to Update Drive Links and Project Links

## Quick Guide

To add your drive links and project deployment links, you need to update the `script.js` file.

### Step 1: Open `script.js`

Find the section around line 310 that looks like this:

```javascript
const driveLinks = {
    projects: '#', // Replace with your projects drive link
    certificates: '#', // Replace with your certificates drive link
    project1: '#', // Replace with Online Marketing Place deploy link
    project2: '#', // Replace with Smart Poultry Farming deploy link
    project3: '#', // Replace with Travel Blog Website deploy link
    project1Code: '#', // Replace with Online Marketing Place GitHub link
    project2Code: '#', // Replace with Smart Poultry Farming GitHub link
    project3Code: '#' // Replace with Travel Blog Website GitHub link
};
```

### Step 2: Replace the `#` with your actual links

**Example:**

```javascript
const driveLinks = {
    projects: 'https://drive.google.com/drive/folders/YOUR_PROJECTS_FOLDER_ID',
    certificates: 'https://drive.google.com/drive/folders/YOUR_CERTIFICATES_FOLDER_ID',
    project1: 'https://your-online-marketing-app.vercel.app',
    project2: 'https://your-poultry-farming-app.netlify.app',
    project3: 'https://your-travel-blog.vercel.app',
    project1Code: 'https://github.com/yourusername/online-marketing-place',
    project2Code: 'https://github.com/yourusername/smart-poultry-farming',
    project3Code: 'https://github.com/yourusername/travel-blog'
};
```

### Step 3: Save and Refresh

After updating the links:
1. Save the `script.js` file
2. Refresh your browser
3. Click on the buttons/links to test them

## What Each Link Does

- **projects**: Link to your Google Drive folder containing project screenshots/demos
- **certificates**: Link to your Google Drive folder containing certificate images/PDFs
- **project1**: Live deployment link for Online Marketing Place
- **project2**: Live deployment link for Smart Poultry Farming
- **project3**: Live deployment link for Travel Blog Website
- **project1Code**: GitHub repository link for Online Marketing Place
- **project2Code**: GitHub repository link for Smart Poultry Farming
- **project3Code**: GitHub repository link for Travel Blog Website

## Getting Google Drive Share Links

1. Upload your files/folders to Google Drive
2. Right-click on the folder/file
3. Click "Share" → "Get link"
4. Make sure the link is set to "Anyone with the link can view"
5. Copy the link and paste it in `script.js`

## Notes

- Make sure all links start with `https://`
- Test all links after updating to ensure they work
- If you don't have a link yet, leave it as `#` (it won't break the site)


