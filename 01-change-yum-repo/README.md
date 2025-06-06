# 01-change-yum-repo (Rocky Linux 9)

## 📝 Objective

Use Ansible to configure YUM/DNF repositories on Rocky Linux 9 systems by replacing the default system repositories with a custom mirror (e.g., Alibaba Cloud, mirrors.ustc.edu.cn, etc.).

---

## 📁 Directory Structure

```bash
01-change-yum-repo/
├── inventory
├── playbook.yaml
└── README.md
```

---

## ⚙️ Requirements

- Control node with Ansible installed (v2.9+; ideally v2.13+ for Rocky 9 support)
- Managed node(s) running Rocky Linux 9
- SSH access and `sudo` privileges on the managed nodes

---

## 📜 Tasks Performed

- Backup existing `.repo` files from `/etc/yum.repos.d/`
- Replace with a new `.repo` file pointing to a custom Rocky Linux 9 mirror
- Run `dnf clean all && dnf makecache` to refresh metadata

---

## 🚀 How to Run

```bash
ansible-playbook -i inventory playbook.yml
```

To specify a remote user and elevate privileges:

```bash
ansible-playbook -i inventory playbook.yml -u your_user --ask-become-pass
```

---

## ✅ How to Verify

- Check contents of /etc/yum.repos.d/ to ensure new repo files exist
- Confirm mirror URLs point to your intended source
- Run:
```bash
dnf repolist
```
You should see repositories from your configured mirror.

---

## 📚 References

- Rocky Linux Mirror List
- Ansible Documentation
- DNF (YUM) Docs for RHEL-based distros

## 🧩 Notes

> On Rocky Linux 9, dnf replaces yum as the default package manager. However, yum is still a symlink to dnf for backward compatibility.

---
