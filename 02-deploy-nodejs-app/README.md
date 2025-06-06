# 02-deploy-nodejs-app

## 📝 Objective

Use Ansible to deploy a simple Node.js Express application with npm and Forever process manager on a target Linux server.

---

## 📁 Project Structure

```bash
02-deploy-nodejs-app/
├── playbook.yml # Main Ansible playbook
├── inventory # Host inventory file
├── app/ # Example Node.js app source folder (copied to target)
│ ├── app.js
│ └── package.json
└── README.md # This documentation
```

---

## ⚙️ Requirements

- Ansible 2.9 or higher
- Managed nodes with a RHEL/CentOS compatible OS supporting EPEL repo
- SSH access and `sudo` privileges on managed nodes

---

## 📜 Playbook Summary

This playbook performs the following tasks:

1. Installs EPEL repository on the managed node.
2. Stops the firewalld service to allow Node.js app access.
3. Installs Node.js and npm from system repository.
4. Installs the `forever` package globally using npm.
5. Creates a directory for the Node.js app (`/usr/local/opt/node`).
6. Copies the example Node.js application code from the `app/` folder to the managed node.
7. Installs app dependencies using `npm install` in the copied app directory.
8. Checks for already running Node.js apps managed by `forever`.
9. Starts the Node.js app if it is not already running.

---

## 🚀 How to Use

### 1. Prepare your inventory file

Example:

```bash
[nodejs]
192.168.1.20 ansible_user=root
```

### 2. Ensure your `app/` folder contains:

- `app.js`:

```javascript
{
 "name": "examplenodeapp",
 "description": "Example Express Node.js app.",
 "author": "Jeff Geerling <geerlingguy@mac.com>",
 "dependencies": {
 "express": "4.x"
 },
 "engine": "node >= 0.10.6"
 }
```

- package.json:

```bash
{
 "name": "examplenodeapp",
 "description": "Example Express Node.js app.",
 "dependencies": {
 "express": "4.x"
 },
 "engine": "node >= 0.10.6"
 }
```

### 3. Run the playbook

```bash
ansible-playbook -i inventory playbook.yml
```
If using a non-root user:
```bash
ansible-playbook -i inventory playbook.yml -u your_user --ask-become-pass
```

## ✅ Verification

- SSH into the target node and run:
```bash
forever list
```
You should see your app (app.js) running.

- Access the app in a browser or via curl:
```bash
curl http://<your-managed-node-ip>:3000/
```
You should receive:
```bash
Hello World!
```

🧩 Notes

- This playbook disables the firewall (firewalld) for demonstration purposes. In production, consider keeping it enabled and opening only necessary ports, such as:
```bash
firewall-cmd --permanent --add-port=3000/tcp
firewall-cmd --reload
```

- The app will be deployed to /usr/local/opt/node/app by default. You can change this by overriding the node_apps_location variable when running the playbook.

- Forever ensures your app keeps running even after terminal logout or crash, but does not auto-start on reboot. Consider adding a systemd service or boot script if needed.
