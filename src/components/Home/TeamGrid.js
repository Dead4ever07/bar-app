import React from "react";
import "../../index.css";
import "./Home.css";
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
    <div className="team-section w3-margin-top-custom">
      {/* Section Title */}
      <h2 className="w3-center w3-margin-bottom">Membros</h2>

      {/* Grid */}
      <div className="equal-height-row w3-row-padding w3-center">
        {members.map((member, index) => (
          <div key={index} className="equal-height-col w3-col l3 m4 s6 w3-margin-bottom">
            <div className="w3-card w3-round w3-white .w3-padding-top-24">
              <div className="w3-container">
                <div className="team-image-container">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="team-image"
                  />
                </div>
                <h3>{member.name}</h3>
                {member.role && <p className="w3-opacity">{member.role}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
