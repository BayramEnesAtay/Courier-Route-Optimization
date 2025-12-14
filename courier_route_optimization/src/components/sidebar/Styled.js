import React from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import styled from "styled-components";
import "primeicons/primeicons.css";



export const SidebarContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 2rem;
`;

export const LogoIcon = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: linear-gradient(135deg, #3f8efc, #4a6cf7);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.3rem;
`;

export const LogoText = styled.span`
  font-size: ${({ collapsed }) => (collapsed ? "0.5rem" : "1.2rem")};
  font-weight: 600;
  color: #3f8efc;
  opacity: ${({ collapsed }) => (collapsed ? 0 : 1)};
  transition: opacity 0.2s ease;
  white-space: nowrap;
`;

export const MenuSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const MenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 14px;
  border-radius: 10px;
  cursor: pointer;
  color: ${({ active }) => (active ? "#fff" : "#555")};
  background: ${({ active }) =>
    active ? "linear-gradient(135deg, #3f8efc, #4a6cf7)" : "transparent"};
  transition: all 0.2s ease;

  &:hover {
    background: ${({ active }) =>
      active ? "linear-gradient(135deg, #3f8efc, #4a6cf7)" : "#f2f6ff"};
  }

  i {
    font-size: 1.1rem;
  }
`;

export const SidebarFooter = styled.div`
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: center;
`;
export const MenuText = styled.span`
  opacity: ${({ collapsed }) => (collapsed ? 0 : 1)};
  width: ${({ collapsed }) => (collapsed ? "0" : "auto")};
  overflow: hidden;
  transition: opacity 0.2s ease, width 0.2s ease;
  white-space: nowrap;
`;