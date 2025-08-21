import React from "react";
import "../../index.css";
import members from "./Members";
/**
 * TeamGrid Component
 * 
 * Props:
 *  - members: Array<{
 *      name: string;
 *      photo?: string;   // image url
 *      role?: string;    // optional subtitle under the name
 *      href?: string;    // optional link wrapper around the card
 *    }>
 *  - columns?: number    // optional base column count (default 2)
 *
 * Usage:
 *  <TeamGrid members={[{ name: 'Sam', photo: '...' }]} />
 */

export function TeamGrid() {
  return (
    <div className="w3-row-padding w3-center">
      {members.map((member, index) => (
        <div key={index} className="w3-col l3 m4 s6 w3-margin-bottom">
          <div className="w3-card w3-round w3-white">
            <div className="w3-container">
              <img
                src={member.photo}
                alt={member.name}
                className="w3-image"
                style={{ width: "100%", height: "auto", borderRadius: "8px" }}
              />
              <h3>{member.name}</h3>
              {member.role && <p className="w3-opacity">{member.role}</p>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
