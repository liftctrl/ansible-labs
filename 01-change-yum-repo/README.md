# 01-change-yum-repo

## 📝 Objective

Automate the process of switching Rocky Linux 9's default YUM/DNF repositories to Alibaba Cloud mirrors using Ansible.

---

## 📁 Project Structure

```bash
01-change-yum-repo/
├── playbook.yml  # Main Ansible playbook
├── inventory     # Host inventory file
└── README.md     # This documentation
```


---

## ⚙️ Requirements

- Ansible 2.9 or higher (recommend 2.13+ for Rocky 9 compatibility)
- One or more managed nodes running Rocky Linux 9
- SSH access to managed nodes
- `sudo` privileges on target machines

---

## 📜 Playbook Summary

This playbook performs the following:

1. Updates BaseOS, AppStream, and Extras repositories in:
   - `/etc/yum.repos.d/rocky.repo`
   - `/etc/yum.repos.d/rocky-extras.repo`

2. Replaces `mirrorlist=` with a commented line to disable it

3. Sets `baseurl=` to Alibaba Cloud’s Rocky Linux 9 mirrors

4. Refreshes the local YUM/DNF metadata using `dnf makecache`

---

## 🚀 How to Use

### 1. Edit the `inventory` file

Example:

```bash
[rocky9]
192.168.1.10 ansible_user=root
```


### 2. Run the playbook

```bash
ansible-playbook -i inventory playbook.yml
```
If using a non-root user:
```bash
ansible-playbook -i inventory playbook.yml -u your_user --ask-become-pass
```

## ✅ Verification

- Check that the following repo files were updated:
  - /etc/yum.repos.d/rocky.repo
  - /etc/yum.repos.d/rocky-extras.repo
- Run the following command on the target node:
```bash
dnf repolist
```
You should see repository base URLs pointing to mirrors.aliyun.com.

## 🧩 Notes

- This playbook is specific to Rocky Linux 9. If you need compatibility with Rocky 8 or RHEL, you may need to adjust the repository paths or mirror URLs.
- YUM is symlinked to DNF on Rocky 9; both commands work, but DNF is preferred.

