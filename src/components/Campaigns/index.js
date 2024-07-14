import { EVENTS } from '../../constants/pubSubEvents';
import { CAMPAINGS } from '../../logic/campaigns';
import { subscribe } from '../../pubsub';
import rootElement from '../../utils/rootElement';

import * as styles from './campaigns.module.scss';

const Campaigns = () => {
  const root = rootElement();
  const campaingsContainer = document.createElement('div');
  const campaignsTitle = document.createElement('h2');
  const campaignsElements = [];
  campaignsTitle.textContent = 'Campaigns';
  campaignsTitle.className = styles.campaignsTitle;
  campaingsContainer.className = styles.campaignsContainer;

  campaingsContainer.appendChild(campaignsTitle);
  root.appendChild(campaingsContainer);

  CAMPAINGS.forEach((campaign, index) => {
    const campaignElement = document.createElement('div');
    campaignElement.className = styles.campaignItemContainer;
    const campaignTitle = document.createElement('h3');
    campaignTitle.className = styles.campaignItemTitle;
    const campaignDescription = document.createElement('p');
    campaignDescription.className = styles.campaignItemDescription;
    campaignTitle.textContent = campaign.name;
    campaignDescription.textContent = campaign.description;
    campaignElement.appendChild(campaignTitle);
    campaignElement.appendChild(campaignDescription);
    campaingsContainer.appendChild(campaignElement);
    campaignsElements.push({
      id: campaign.id,
      element: campaignElement,
    });
    if (index < CAMPAINGS.length - 1) {
      const divider = document.createElement('hr');
      divider.className = styles.seperator;
      campaingsContainer.appendChild(divider);
    }
  });

  subscribe(EVENTS.CAMPAIGN_APPLIED, campaign => {
    const campaignElement = campaignsElements.find(
      element => element.id === campaign,
    ).element;

    campaignElement.classList.add(styles.applied);
  });

  subscribe(EVENTS.CAMPAIGN_REMOVED, campaign => {
    const campaignElement = campaignsElements.find(
      element => element.id === campaign,
    ).element;

    campaignElement.classList.remove(styles.applied);
  });
};

export default Campaigns;
